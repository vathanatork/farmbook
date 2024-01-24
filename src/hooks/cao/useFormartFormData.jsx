import React from 'react'

export const useFormartFormData = (formData, imageBase64 = "") => {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      birthday,
      id_number,
      address,
      status,
      gender,
      adr_province_id,
      adr_district_id,
      adr_commune_id,
      adr_village_id,
      nid_file,
      password,
      is_active,
    } = formData;

    // Extracting the necessary information
    const name = `${first_name} ${last_name}`;

    // Formatting the is_active field based on the string value
    const formattedIsActive = is_active === "true";

    // Replace empty string values with null
    const replaceEmptyWithNull = (value) => (value === "" ? null : value);

    // Creating the formatted data object
    const formattedData = {
      name: replaceEmptyWithNull(name),
      email: replaceEmptyWithNull(email),
      first_name: replaceEmptyWithNull(first_name),
      last_name: replaceEmptyWithNull(last_name),
      phone_number: replaceEmptyWithNull(phone_number),
      birthday: replaceEmptyWithNull(birthday),
      id_number: replaceEmptyWithNull(id_number),
      address: replaceEmptyWithNull(address),
      status: replaceEmptyWithNull(status),
      approve_at: null,
      approve_type: null,
      approve_step: null,
      password: replaceEmptyWithNull(password),
      level_id: null,
      is_active: formattedIsActive,
      detail: {
        adr_province_id: replaceEmptyWithNull(adr_province_id),
        adr_district_id: replaceEmptyWithNull(adr_district_id),
        adr_commune_id: replaceEmptyWithNull(adr_commune_id),
        adr_village_id: replaceEmptyWithNull(adr_village_id),
        nid_file: replaceEmptyWithNull(imageBase64),
        gender: replaceEmptyWithNull(gender),
      },
    };

    return formattedData;
  };