import Datatype from 'sequelize';
import isUUID from 'validator/lib/isUUID';
import Error from 'sequelize/lib/errors';

export default function (db) {
  const customer = db.define('Customer', {
    id: {
      type: Datatype.UUID,
      primaryKey: true,
      defaultValue: Datatype.UUIDV4,
    },
    ssn: {
      type: Datatype.STRING,
      field: 'ssn',
      allowNull: false,
      unique: 'isDuplicatedCustomerInformation',
      isReadOnly: true,
      validate: {
        len: [0, 11],
      },
    },
    firstName: {
      type: Datatype.STRING,
      field: 'first_name',
      allowNull: false,
      validate: {
        len: [0, 20],
      },
    },
    surname: {
      type: Datatype.STRING,
      field: 'surname',
      allowNull: false,
      unique: 'isDuplicatedCustomerInformation',
      validate: {
        len: [0, 20],
      },
    },
    address1: {
      type: Datatype.STRING,
      field: 'address1',
      allowNull: false,
      validate: {
        len: [0, 40],
      },
    },
    address2: {
      type: Datatype.STRING,
      field: 'address2',
      allowNull: true,
      validate: {
        len: [0, 40],
      },
    },
    city: {
      type: Datatype.STRING,
      field: 'city',
      allowNull: false,
      validate: {
        len: [0, 40],
      },
    },
    stateCode: {
      type: Datatype.STRING,
      field: 'state_code',
      allowNull: false,
      validate: {
        len: [0, 2],
      },
    },
    postalCode: {
      type: Datatype.STRING,
      field: 'postal_code',
      allowNull: false,
      validate: {
        len: [0, 10],
      },
    },
    countryCode: {
      type: Datatype.STRING,
      field: 'country_code',
      allowNull: false,
      validate: {
        len: [0, 30],
      },
    },
    birthDate: {
      type: Datatype.DATE,
      field: 'birth_date',
      allowNull: false,
      isReadOnly: true,
      unique: 'isDuplicatedCustomerInformation',
    },
    mobilePhoneNumber: {
      type: Datatype.STRING,
      field: 'mobile_phone_number',
      allowNull: false,
      validate: {
        len: [0, 10],
      },
    },
    emailAddress: {
      type: Datatype.STRING,
      field: 'email_address',
      allowNull: false,
      validate: {
        len: [0, 50],
        isEmail: true,
      },
    },
    stateId: {
      type: Datatype.STRING,
      field: 'state_id',
      allowNull: true,
      isReadOnly: true,
      validate: {
        len: [0, 15],
      },
    },
    stateIdIssueLocation: {
      type: Datatype.STRING,
      field: 'state_id_issue_location',
      allowNull: true,
      isReadOnly: true,
      validate: {
        len: [0, 20],
      },
    },
    stateIdIssueDate: {
      type: Datatype.DATE,
      field: 'state_id_issue_date',
      allowNull: true,
      isReadOnly: true,
    },
    stateIdExpirationDate: {
      type: Datatype.DATE,
      field: 'state_id_expiration_date',
      allowNull: true,
      isReadOnly: true,
    },
    passportId: {
      type: Datatype.STRING,
      field: 'passport_id',
      allowNull: true,
      isReadOnly: true,
      validate: {
        len: [0, 15],
      },
    },
    passportIdIssueLocation: {
      type: Datatype.STRING,
      field: 'passport_id_issue_location',
      allowNull: true,
      isReadOnly: true,
      validate: {
        len: [0, 20],
      },
    },
    passportIdIssueDate: {
      type: Datatype.DATE,
      field: 'passport_id_issue_date',
      allowNull: true,
      isReadOnly: true,
    },
    passportIdExpirationDate: {
      type: Datatype.DATE,
      field: 'passport_id_expiration_date',
      allowNull: true,
      isReadOnly: true,
    },
    driverLicense: {
      type: Datatype.STRING,
      field: 'driver_license',
      allowNull: true,
      isReadOnly: true,
      validate: {
        len: [0, 15],
      },
    },
    driverLicenseIssueLocation: {
      type: Datatype.STRING,
      field: 'driver_license_issue_location',
      allowNull: true,
      isReadOnly: true,
      validate: {
        len: [0, 20],
      },
    },
    driverLicenseIssueDate: {
      type: Datatype.DATE,
      field: 'driver_license_issue_date',
      allowNull: true,
      isReadOnly: true,
    },
    driverLicenseExpirationDate: {
      type: Datatype.DATE,
      field: 'driver_license_expiration_date',
      allowNull: true,
      isReadOnly: true,
    },
    thirdPartyUserId: {
      type: Datatype.STRING,
      field: 'third_party_user_id',
      allowNull: false,
      isReadOnly: true,
      validate: {
        len: [0, 100],
      },
    },
  }, {
    underscored: true,
    freezeTableName: true, // Model tableName will be the same as the model name
    hooks: {
      beforeUpdate(Customer) { // Enforce ReadOnly columns to block update when accessing through the PUT method of customerController.
        const keys = [];
        Object.keys(Customer._changed) // eslint-disable-line no-underscore-dangle
            .forEach((fieldName) => {
              keys.push(fieldName);
            });

        if (!keys.length) {
          return;
        }

        const validationErrors = [];

        keys.forEach((fieldName) => {
          if (Customer.rawAttributes[fieldName].isReadOnly == null) {
            return;
          }
          if (Customer.rawAttributes[fieldName].isReadOnly) {
            validationErrors.push(new Error.ValidationErrorItem(`Field ${fieldName} cannot be updated`, 'readOnly Violation', fieldName, Customer[fieldName]));
          }
        });

        if (validationErrors.length) {
          throw new Error.ValidationError(null, validationErrors);
        }
      },
    },
    validate: {
      idIsValidUUID() {
        if (this.id == null) {
          return;
        }
        if (!isUUID(this.id, 4)) {
          throw new Error('Id is not valid UUID.');
        }
      },
      stateIdCompleteInformation() {
        if (this.stateId == null && this.stateIdIssueLocation == null &&
            this.stateIdIssueDate == null && this.stateIdExpirationDate == null) {
          return;
        }
        if (this.stateId != null && this.stateIdIssueLocation != null &&
            this.stateIdIssueDate != null && this.stateIdExpirationDate != null) {
          return;
        }
        throw new Error.ValidationErrorItem('All State information should be provided.', 'Validation Error', null, null);
      },
      passportCompleteInformation() {
        if (this.passportId == null && this.passportIdIssueLocation == null &&
            this.passportIdIssueDate == null && this.passportIdExpirationDate == null) {
          return;
        }
        if (this.passportId != null && this.passportIdIssueLocation != null &&
            this.passportIdIssueDate != null && this.passportIdExpirationDate != null) {
          return;
        }
        throw new Error.ValidationErrorItem('All Passport information should be provided.', 'Validation Error', null, null);
      },
      driverLicenseCompleteInformation() {
        if (this.driverLicense == null && this.driverLicenseIssueLocation == null &&
            this.driverLicenseIssueDate == null && this.driverLicenseExpirationDate == null) {
          return;
        }
        if (this.driverLicense != null && this.driverLicenseIssueLocation != null &&
            this.driverLicenseIssueDate != null && this.driverLicenseExpirationDate != null) {
          return;
        }
        throw new Error.ValidationErrorItem('All Driver license information should be provided.', 'Validation Error', null, null);
      },
    },
  });

  return customer;
}
