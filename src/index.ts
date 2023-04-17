import databaseConfig from "./config/database";
import AfriLearnServer from "./server";
import Subject from "./subjects/models/Subjects";
import InjectSubjects from "./utilities/dbInjection";

const PORT = process.env.PORT;
console.log("\n\t Index file-PORT........", PORT);


AfriLearnServer.listen(PORT, async() => {
    console.info("\n\t Server is hooked-up.....");
    await databaseConfig();
    const subjectInitialiser = new InjectSubjects();
    subjectInitialiser.subjectInitialiser();
    subjectInitialiser.topicInitialiser();
});