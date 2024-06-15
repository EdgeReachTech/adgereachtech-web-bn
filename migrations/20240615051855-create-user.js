'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Users',{
    id:{
         type:Sequelize.INTEGER,
         autoIncrement:true,
          primaryKey:true
      },
    firstName:{
          type:Sequelize.STRING(50),
          allowNull:false
         },
    lastName:{
          type:Sequelize.STRING(50),
          allowNull:false
         },
    location:{
          type:Sequelize.STRING(50),
          allowNull:false
         },
    dateOfBirth:{
          type:Sequelize.STRING(50),
          allowNull:false
         },
    status:{
          type:Sequelize.STRING(50),
          allowNull:false
         },
    role:{
          type:Sequelize.STRING(50),
          allowNull:false
         },
    gander:{
          type:Sequelize.STRING(50),
          allowNull:false
         },
    isverified:{
          type:Sequelize.STRING(50),
          allowNull:false
         },
    verifiedAt:{
          type:Sequelize.STRING(50),
          allowNull:false
         },
    password:{
          type:Sequelize.STRING,
          allowNull:false
         },
    createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
    updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        }
   })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('Users')
  }
};
