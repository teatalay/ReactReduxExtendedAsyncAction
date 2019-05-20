const { overrideDevServer } = require("customize-cra");

const configureDevServer = () => config => {
  return {
    ...config,
    before: function(app) {
      app.post("/api/v1/auth/login/", function(req, res) {
        res.json({
          success: true,
          user: {
            ID: req.ID,
            profile: {
              name: "Tuğrul Emre",
              surname: "Atalay",
              birthDate: "21.08.1991"
            }
          }
        });
      });
    }
  };
};

module.exports = {
  devServer: overrideDevServer(configureDevServer())
};
