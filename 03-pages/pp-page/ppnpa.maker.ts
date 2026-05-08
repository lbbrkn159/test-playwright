import { Page, Locator } from '@playwright/test';

export class PPNPAMakerMenu {
  readonly page: Page 

  // first tap element
  readonly createButton: Locator; 

  // second tap element

  // task element
  //// tab portfolio
  readonly purchaseTypeDropdown: Locator;  
  readonly purchaseAuthorityGroup: Locator;  //combobox type
  readonly portSourceInput: Locator;  //generic type
  readonly portSourceDropdown: Locator;
  //// tab summary
  readonly summaryButton: Locator;
  readonly summaryGrid: Locator;  //grid element
  readonly purposeRow: Locator //tick choice element
  readonly purposeRadioGroup: Locator; //radiogroup element
  readonly subjectRow: Locator;
  readonly subjectInput: Locator;
  readonly objectRow: Locator;
  readonly objectInput: Locator;
  readonly presenterRow: Locator;
  readonly presenterInput: Locator;
  readonly presenterDropdown: Locator;
  readonly factTab: Locator;
  readonly factInput: Locator;
  readonly problemTab: Locator;
  readonly problemInput: Locator;
  readonly commentTab: Locator;
  readonly commentInput: Locator;

  readonly submitBtn: Locator;
  
   

  constructor(page: Page) {
    this.page                       = page;
    this.createButton               = page.getByRole('button', { name: /สร้าง/ })  ;
    // type combobox element ที่มี label by
    this.purchaseTypeDropdown       = page.getByLabel('รูปแบบการซื้อ');
    this.purchaseAuthorityGroup     = page.getByRole('radiogroup', {name: 'อำนาจพิจารณาการซื้อ'});

    // type generic element
    this.portSourceInput            = page.getByRole('combobox', {name: 'Port Source'});
    this.portSourceDropdown         = page.getByRole('listbox');
    this.summaryButton              = page.getByRole('button', {name: 'ใบสรุปนำเสนอ'});
    this.summaryGrid                = page.locator('[name="TemplateGridHeader_templateGrid1SummarySheet"]').locator('..')
                                        .locator('.mx-templategrid-content-wrapper');
    this.purposeRow                 = page.getByText('เพื่อ');
    this.purposeRadioGroup          = this.purposeRow.locator('[role="radiogroup"]');
    this.subjectRow                 = page.locator('tr', {has: this.page.getByText('เรื่อง')});
    this.subjectInput               = this.subjectRow.locator('input');
    this.objectRow                  = page.locator('tr', {has: this.page.getByText('วัตถุประสงค์')});
    this.objectInput                = this.objectRow.locator('input');
    this.presenterRow               = page.locator('tr', {has: this.page.getByText('ผู้เสนอ')});
    this.presenterInput             = this.presenterRow.getByRole('combobox');
    this.presenterDropdown          = this.presenterRow.getByRole('listbox');
    this.factTab                    = page.getByRole('tab', { name: /ข้อเท็จจริง/});  
    this.factInput                  = page.getByRole('tabpanel').filter({ hasText: 'ข้อเท็จจริง' }).locator('textarea');
    this.problemTab                 = page.getByRole('tab', { name: /ประเด็นปัญหา/});  
    this.problemInput               = page.getByRole('tabpanel').filter({ hasText: 'ประเด็นปัญหา' }).locator('textarea');
    this.commentTab                 = page.getByRole('tab', { name: /ความเห็นของผู้นำเสนอ/});  
    this.commentInput               = page.getByRole('tabpanel').filter({ hasText: 'ความเห็นของผู้นำเสนอ' }).locator('textarea');
    this.submitBtn                  = page.getByRole('button', {name: 'ส่งอนุมัติ'});
  }

  async navigateToPPNPA() {
    await this.createButton.click();
  }  
  // method สำหรับเลือก option ใน dropdown โดยใช้ value ของ option นั้นๆ
  async selectPurchaseType(value: string) {
    try {
      await this.purchaseTypeDropdown.selectOption(value)
    } catch (error) {
      throw new Error(`Dropdown option not found: ${value}`)
    }
  }
 // method สำหรับเลือก option ใน radio group โดยใช้ label ของ option นั้นๆ และกัน click ซ้ำ
  async selectPurchaseAuthority(option: 'grant' | 'notGrant') {
    const labelMap = {
      grant: 'คกก. มอบอำนาจให้ คกบ.',
      notGrant: 'คกก. ไม่มอบอำนาจ'
    };

    const radio = this.purchaseAuthorityGroup.getByRole('radio', {
      name: labelMap[option]
    });
    // กัน click ซ้ำ
    if (!(await radio.isChecked())) {
      await radio.check();
    }
  }
  // method สำหรับเลือก option ใน dropdown แบบ generic โดยใช้ value ของ option นั้นๆ
  async selectPortSource(value: string) {
    if ((await this.portSourceInput.inputValue()) === value) return;
    await this.portSourceInput.click();
    await this.portSourceInput.fill(value);
    const option = this.portSourceDropdown.getByRole('option', { name: value });
    if ((await option.count()) === 0) {
      throw new Error(`Port Source "${value}" not found`);
    }
    await option.first().click();
  }

  async clickSummary() {
    await this.summaryButton.click();
  }

  async selectRowByColumnText(columnIndex: number, text: string) {
    const rows = this.summaryGrid.locator('.mx-templategrid-item');
  
    const targetRow = rows.filter({
      has: this.page.locator(`td:nth-child(${columnIndex})`, {
        hasText: text
      })
    });
    if ((await targetRow.count()) === 0) {
      throw new Error(`Text "${text}" not found in column ${columnIndex}`);
    }
    await targetRow.first().click();
  }

  async selectPurpose(option: 'ทราบ' | 'สัตยาบัน' | 'พิจารณา') {
    const radio = this.purposeRadioGroup.getByRole('radio', {
      name: option
    });
    if ((await radio.count()) === 0) {
      throw new Error(`Purpose option "${option}" not found`);
    }
    if (!(await radio.first().isChecked())) {
      await radio.first().check();
    }
  }

  async fillSubject(value: string) {
    const current = await this.subjectInput.inputValue();
    if (current === value) return;
    await this.subjectInput.fill(value);
  }

  async fillObject(value: string) {
    const current = await this.objectInput.inputValue();
    if (current === value) return;
    await this.objectInput.fill(value);
  }

  async selectPresenter(value: string) {
    if ((await this.presenterInput.inputValue()) === value) return;
    await this.presenterInput.click();
    await this.presenterInput.fill(value);
    const option = this.presenterDropdown.getByRole('option', {
      name: new RegExp(value, 'i')
    });
  
    if ((await option.count()) === 0) {
      throw new Error(`No option contains "${value}"`);
    }
  
    await option.first().click();
  }

  async fillFact(value: string) {
    const current = await this.factInput.inputValue();
    if (current === value) return;
    await this.factInput.fill(value);
  }

  async fillProblem(value: string) {
    const current = await this.problemInput.inputValue();
    if (current === value) return;
    await this.problemInput.fill(value);
  }

  async fillComment(value: string) {
    const current = await this.commentInput.inputValue();
    if (current === value) return;
    await this.commentInput.fill(value);
  }

}