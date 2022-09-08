module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define('job', {
      job_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: "description"
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      isActive:{
        type:Sequelize.BOOLEAN
      }
    }, {
      freezeTableName: true,
      tableName: "job",
    })

    return Job;
}