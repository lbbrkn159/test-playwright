import os
import glob
from robot import run
from robot.libraries.BuiltIn import BuiltIn
from robot.api import ExecutionResult, ResultVisitor, TestSuiteBuilder
from robot.errors import DataError
from modules.test.utilities import variables
import sys
from robot.rebot import rebot
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))
from util import excel_generator  # Make sure this import is correct
from datetime import datetime
current_date = str(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

def disable_run_on_failure():
    try:
        selenium_lib = BuiltIn().get_library_instance("SeleniumLibrary")
        selenium_lib.run_on_failure = None  # ปิด Run On Failure
        print("Successfully disabled Run On Failure")
    except Exception as e:
        print(f"Failed to disable Run On Failure: {e}")

def runScript():
    script_dir = os.path.dirname(__file__)
    functional_dir = os.path.join(script_dir, "functional")
    all_output_files = []
    auto_test_dirs = [d for d in glob.glob(os.path.join(functional_dir)) if os.path.isdir(d)]
    processed_dirs = set()
    all_test_results = []

    for auto_test_dir in auto_test_dirs:
        if auto_test_dir in processed_dirs:
            print(f"Skipping already processed directory: {auto_test_dir}")
            continue

        print(f"Running tests in directory: {auto_test_dir}")
        results_dir = os.path.join(auto_test_dir, "results")
        os.makedirs(results_dir, exist_ok=True)
        robot_files = glob.glob(os.path.join(auto_test_dir, "testcase-*.robot"))

        for index, robot_file in enumerate(robot_files):
            print(f"Running robot file: {robot_file}")
            output_path = os.path.join(results_dir, f"output_{index}.xml")
            run(robot_file, output=output_path, log=None, report=None, outputdir=results_dir)
            all_output_files.append(output_path)
            disable_run_on_failure()
        
        processed_dirs.add(auto_test_dir)
    if all_output_files:
        rebot(*all_output_files,
            output=os.path.join(results_dir, "output.xml"),
            log=os.path.join(results_dir, "log.html"),
            report=os.path.join(results_dir, "report.html"))
        print("Merged report created in:", results_dir)

    for auto_test_dir in auto_test_dirs:
        print(f"Processing results in directory: {auto_test_dir}")
        results_dir = os.path.join(auto_test_dir, "results")
        output_xml = os.path.join(results_dir, "output.xml")
        
        if not os.path.exists(output_xml):
            print(f"No output.xml found in {results_dir}, skipping...")
            continue

        try:
            result = ExecutionResult(output_xml)
        except DataError as e:
            print(f"Error reading XML source '{output_xml}': {e}")
            continue

        class TestStatusVisitor(ResultVisitor):
            def __init__(self):
                self.test_statuses = []
                self.screenshots = {}

            def visit_test(self, test):
                self.test_statuses.append(test.status)
                for msg in test.message:
                    if "Screenshot" in msg:
                        screenshot_path = msg.split("'")[1]
                        self.screenshots[test.name] = screenshot_path

        visitor = TestStatusVisitor()
        result.visit(visitor)

        robot_files = glob.glob(os.path.join(auto_test_dir, "testcase-*.robot"))
        if not robot_files:
            print(f"No robot files found in {auto_test_dir}, skipping...")
            continue

        for robot_file in robot_files:  # <--- วนทุกไฟล์
            suite = TestSuiteBuilder().build(robot_file)

            for index, test in enumerate(suite.tests, start=1):
                print(f"Reading test case: {test.name}")
                test_name = test.name
                doc_lines = test.doc.split("\n") if test.doc else []

                test_data = {k: "" for k in [
                    "module", "menu", "function", "test_id", "alt_test_case",
                    "preconditions", "dependencies", "ref_other_module_in", "ref_other_module_out",
                    "test_scenario", "description", "test_data", "test_steps", "tester_/_user_role",
                    "test_script_id", "test_script_name", "alternate_flow", "expected_result",
                    "actual_result", "test_environment", "browser", "priority", "test_status",
                    "execution_date", "setting_result"
                ]}
                test_data["test_id"] = os.path.splitext(os.path.basename(robot_file))[0]

                section = None
                for line in doc_lines:
                    line = line.strip()
                    if line.startswith("**"):
                        section = line.replace("**", "").replace(":", "").strip().lower().replace(" ", "_")
                        continue

                    for var_name, var_value in variables.__dict__.items():
                        if var_name.isupper():
                            if isinstance(var_value, dict):
                                for key, value in var_value.items():
                                    line = line.replace(f"${{{var_name}['{key}']}}", str(value))
                            else:
                                line = line.replace(f"${{{var_name}}}", str(var_value))

                    if section in test_data:
                        test_data[section] += line + "\n"
                    else:
                        test_data["description"] += line + " "

                test_data["test_status"] = visitor.test_statuses[index - 1] if index - 1 < len(visitor.test_statuses) else ""
                test_data["screenshot_path"] = visitor.screenshots.get(test.name, "")

                all_test_results.append(test_data)
    excel_generator.generate_excel(all_test_results)
    print(f"Created file successfully with all results!")

def main():
    runScript()


if __name__ == "__main__":
    main()