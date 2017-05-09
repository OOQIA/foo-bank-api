import Datatype from 'sequelize';

export default function (db) {
  const Customer = db.define('Customer', {
    ssn: {
      type: Datatype.STRING,
      field: 'ssn',
      validate: {
        len: [11],
        is: /^[a-z]+$/i, //TODO: Add Social security number regExp validation
      },
    },
    firstName: {
      type: Datatype.STRING,
      field: 'first_name',
      validate: {
        len: [20],
      },
    },
    surname: {
      type: Datatype.STRING,
      field: 'surname',
      validate: {
        len: [20],
      },
    },
    address1: {
      type: Datatype.STRING,
      field: 'address1',
      validate: {
        len: [40],
      },
    },
    address2: {
      type: Datatype.STRING,
      field: 'address2',
      allowNull: true,
      validate: {
        len: [40],
      },
    },
    city: {
      type: Datatype.STRING,
      field: 'city',
      validate: {
        len: [40],
      },
    },
    stateCode: {
      type: Datatype.STRING,
      field: 'state_code',
      validate: {
        len: [2],
      },
    },
    postalCode: {
      type: Datatype.STRING,
      field: 'postal_code',
      validate: {
        len: [10],
      },
    },
    countryCode: {
      type: Datatype.STRING,
      field: 'country_code',
      validate: {
        len: [30],
      },
    },
    birthDate: {
      type: Datatype.DATE,
      field: 'birth_date',
    },
    mobilePhoneNumber: {
      type: Datatype.STRING,
      field: 'mobile_phone_number',
      validate: {
        len: [10],
      },
    },
    emailAddress: {
      type: Datatype.STRING,
      field: 'email_address',
      validate: {
        len: [50],
        isEmail: true,
      },
    },
    stateId: {
      type: Datatype.STRING,
      field: 'state_id',
      allowNull: true,
      validate: {
        len: [15],
      },
    },
    stateIdIssueLocation: {
      type: Datatype.STRING,
      field: 'state_id_issue_location',
      allowNull: true,
      validate: {
        len: [20],
      },
    },
    stateIdIssueDate: {
      type: Datatype.DATE,
      field: 'state_id_issue_date',
      allowNull: true,
    },
    stateIdExpirationDate: {
      type: Datatype.DATE,
      field: 'state_id_expiration_date',
      allowNull: true,
    },
    passportId: {
      type: Datatype.STRING,
      field: 'passport_id',
      allowNull: true,
      validate: {
        len: [15],
      },
    },
    passportIdIssueLocation: {
      type: Datatype.STRING,
      field: 'passport_id_issue_location',
      allowNull: true,
      validate: {
        len: [20],
      },
    },
    passportIdIssueDate: {
      type: Datatype.DATE,
      field: 'passport_id_issue_date',
      allowNull: true,
    },
    passportIdExpirationDate: {
      type: Datatype.DATE,
      field: 'passport_id_expiration_date',
      allowNull: true,
    },
    driverLicense: {
      type: Datatype.STRING,
      field: 'driver_license',
      allowNull: true,
      validate: {
        len: [15],
      },
    },
    driverLicenseIssueLocation: {
      type: Datatype.STRING,
      field: 'driver_license_issue_location',
      allowNull: true,
      validate: {
        len: [20],
      },
    },
    driverLicenseIssueDate: {
      type: Datatype.DATE,
      field: 'state_id_issue_date',
      allowNull: true,
    },
    driverLicenseExpirationDate: {
      type: Datatype.STRING,
      field: 'state_id_expiration_date',
      allowNull: true,
    },
    thirdPartyUserId: {
      type: Datatype.STRING,
      field: 'third_party_user_id',
      validate: {
        len: [100],
      },
    },
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
  });

  return Customer;
}
