const { BasePage } = require("../base/BasePage");
const { RegisterLevelDataLocator } = require("./Register-LevelsData-Locators");

class RegisterLevelsData  extends BasePage{

  constructor(page) {
        super(page);
        this.locators = RegisterLevelDataLocator.locators;
    }
    
     async selectClassEight() {
        this.logger.info("📚 Selecting Class Eight");
        
        // Click on Studying In dropdown
        await this.page.click(this.locators.StudyingIn);
        await this.page.waitForTimeout(500);
        
        // Click on Class 8th option
        await this.page.click(this.locators.Select_Class_eight);
        
        this.logger.info("✅ Class Eight selected");
    }
}
module.exports = { RegisterLevelsData }