export const productsData = {
    "results": [
      {
        "_id": "64020c62f876cda4b0178365",
        "categoryId": "63fdbfe9ff234cee7e00fe3e",
        "type": "string",
        "title": "Furniture Furniture Furniture Furniture",
        "description": "High quality High quality High quality High quality High quality High quality",
        "orderStatus": 1,
        "bidStatus": 2,
        "createdBy": "63fcf605a381eaf81ee9cbba",
        "pickupAddress": "string",
        "images": [
          {
            "uri": "string",
            "isDefault": true,
            "_id": "64020c62f876cda4b0178366"
          }
        ],
        "createdAt": "2023-03-03T15:04:02.787Z",
        "updatedAt": "2023-03-08T15:14:56.847Z",
        "__v": 0,
        "acceptedAmount": "100",
        "category": {
          "_id": "63fdbfe9ff234cee7e00fe3e",
          "name": "Electronics",
          "categoryEnum": 2
        }
      },
      {
        "_id": "640423dbd22afbcec3f8bed9",
        "categoryId": "63fdbfe9ff234cee7e00fe3e",
        "type": "string",
        "title": "string",
        "description": "string",
        "brand": "string",
        "purchasedYear": "string",
        "distanceDriven": "string",
        "orderStatus": 1,
        "bidStatus": 1,
        "createdBy": "63fcf605a381eaf81ee9cbba",
        "pickupAddress": "string",
        "images": [
          {
            "uri": "string",
            "isDefault": true,
            "_id": "640423dbd22afbcec3f8beda"
          }
        ],
        "createdAt": "2023-03-05T05:08:43.526Z",
        "updatedAt": "2023-03-05T05:08:43.526Z",
        "__v": 0,
        "category": {
          "_id": "63fdbfe9ff234cee7e00fe3e",
          "name": "Electronics",
          "categoryEnum": 2
        }
      }
    ],
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "totalResults": 2
  }

  export const product = {
    "_id": "64020c62f876cda4b0178365",
    "categoryId": "63fdbfe9ff234cee7e00fe3e",
    "type": "string",
    "title": "string",
    "description": "This is sample description This is sample description This is sample description This is sample description This is sample descriptionThis is sample description This is sample description",
    "orderStatus": 1,
    "bidStatus": 1,
    "createdBy": "63fcf605a381eaf81ee9cbba",
    "pickupAddress": "string",
    "images": [
      {
        "uri": "string",
        "isDefault": true,
        "_id": "64020c62f876cda4b0178366"
      }
    ],
    "createdAt": "2023-03-03T15:04:02.787Z",
    "updatedAt": "2023-03-08T15:14:56.847Z",
    "__v": 0,
    "acceptedAmount": "100",
    "category": {
      "_id": "63fdbfe9ff234cee7e00fe3e",
      "name": "Electronics",
      "categoryEnum": 2
    },
    "bidHistory": [
      {
        "_id": "640899656f17b41b03f3a614",
        "productId": "64020c62f876cda4b0178365",
        "bidCreatedBy": "63fcf605a381eaf81ee9cbba",
        "newValue": 100,
        "notes": "string",
        "bidStatus": 2,
        "createdAt": "2023-03-08T14:19:18.001Z",
        "updatedAt": "2023-03-08T15:14:55.783Z",
        "__v": 0,
        "respondedBy": "63fe2918ff234cee7e00fe41",
        "bidCreator": {
          "_id": "63fcf605a381eaf81ee9cbba",
          "name": "rupesh_yadav",
          "email": "test@test.com",
          "mobile": "5555555555",
          "role": 2
        },
        "responder": {
          "_id": "63fe2918ff234cee7e00fe41",
          "name": "rupesh",
          "email": "admin@admin.com",
          "mobile": "9999999999",
          "role": 1
        }
      },
      {
        "_id": "6405eb24145451264ed1859d",
        "productId": "64020c62f876cda4b0178365",
        "bidCreatedBy": "63fe2918ff234cee7e00fe41",
        "newValue": 1234,
        "notes": "new bid",
        "bidStatus": 4,
        "createdAt": "2023-03-06T13:31:16.768Z",
        "updatedAt": "2023-03-08T14:19:17.209Z",
        "__v": 0,
        "respondedBy": "63fcf605a381eaf81ee9cbba",
        "bidCreator": {
          "_id": "63fe2918ff234cee7e00fe41",
          "name": "rupesh",
          "email": "admin@admin.com",
          "mobile": "9999999999",
          "role": 1
        },
        "responder": {
          "_id": "63fcf605a381eaf81ee9cbba",
          "name": "rupesh_yadav",
          "email": "test@test.com",
          "mobile": "5555555555",
          "role": 2
        }
      }
    ]
  }