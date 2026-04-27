def thirteen_digit_completion(first_twelve_id_number: str):
    """
    Check if the given ID number is a valid 13-digit number.

    Parameters:
    id_number (str): The ID number to be checked.

    Returns:
    bool: True if the ID number is a valid 13-digit number, False otherwise.
    """
    nu_list = [int(digit) for digit in first_twelve_id_number]
    if len(nu_list) != 12:
        return False
    total = sum(nu_list[i] * (13 - i) for i in range(12))
    check_digit = (11 - (total % 11)) % 10
    return first_twelve_id_number+str(check_digit)


my_id = "110010000105"
print(thirteen_digit_completion(my_id))