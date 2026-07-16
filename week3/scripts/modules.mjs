import byuiCourse from "./course.mjs";
import { setSectionSelection } from "./sections.mjs";
import {
    setTitle,
    renderSections,
    showStatus
} from "./output.mjs";

const enrollButton =
    document.querySelector("#enrollStudent");

const dropButton =
    document.querySelector("#dropStudent");

enrollButton.addEventListener("click", () => {
    const sectionNum = Number(
        document.querySelector("#sectionNumber").value
    );

    const result =
        byuiCourse.changeEnrollment(sectionNum);

    renderSections(byuiCourse.sections);
    showStatus(result);
});

dropButton.addEventListener("click", () => {
    const sectionNum = Number(
        document.querySelector("#sectionNumber").value
    );

    const result =
        byuiCourse.changeEnrollment(sectionNum, false);

    renderSections(byuiCourse.sections);
    showStatus(result);
});

setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);