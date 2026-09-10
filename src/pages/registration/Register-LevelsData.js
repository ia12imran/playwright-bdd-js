const { BasePage } = require("../base/BasePage");
const { RegisterLevelDataLocator } = require("./Register-LevelsData-Locators");

class RegisterLevelsData extends BasePage {

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

    async selectSchoolBoardasrandomValue() {
        // Case 1: Select a random school board from the dropdown
        // this.logger.info('📖 Opening School Board dropdown...');

        // // Wait for dropdown and click to open
        // await this.page.waitForSelector(this.locators.board_dropdown, { timeout: 12000 });
        // await this.page.click(this.locators.board_dropdown);
        // await this.page.waitForTimeout(500); // Wait for dropdown to open

        // // Define all available board options
        // const boardOptions = ['CBSE', 'State Board', 'ICSE', 'IB', 'Cambridge'];

        // // Pick a random board
        // const randomBoard = boardOptions[Math.floor(Math.random() * boardOptions.length)];

        // this.logger.info(`🎲 Randomly selected board: ${randomBoard}`);

        // // Select using dynamic option ID pattern
        // const boardOptionSelector = `#react-select-3-option-${boardOptions.indexOf(randomBoard)}`;
        // await this.page.waitForSelector(boardOptionSelector, { timeout: 12000 });
        // await this.page.click(boardOptionSelector);

        // this.logger.info(`✅ Board selected: ${randomBoard}`);
        // return randomBoard; // Return for verification

        // Case 2: Hybrid - Random Text + Dynamic XPath (RECOMMENDED)

        this.logger.info('📖 Opening School Board dropdown...');

        // Step 1: Open the dropdown
        await this.page.waitForSelector(this.locators.board_dropdown, { timeout: 12000 });
        await this.page.click(this.locators.board_dropdown);
        await this.page.waitForTimeout(500);

        // Step 2: Wait for options to render
        await this.page.waitForSelector('[role="option"]', { timeout: 12000 });

        // Step 3: Get all options
        const options = await this.page.$$('[role="option"]');

        // Step 4: Pick random option
        const randomIndex = Math.floor(Math.random() * options.length);
        const randomOption = options[randomIndex];

        // Step 5: Get text for logging
        const selectedText = await randomOption.textContent();

        // Step 6: Click the random option
        await randomOption.click();

        this.logger.info(`✅ Randomly selected board: "${selectedText}"`);

        // Store for later verification
        this.selectedBoard = selectedText;

        return selectedText;


    }
}
module.exports = { RegisterLevelsData }