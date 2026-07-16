const byuiCourse = {
    code: "WDD 231",
    name: "Frontend Web Development I",

    sections: [
        {
            sectionNum: 1,
            roomNum: "STC 353",
            enrolled: 26,
            days: "TTh",
            instructor: "Brother Smith"
        },
        {
            sectionNum: 2,
            roomNum: "STC 347",
            enrolled: 22,
            days: "MWF",
            instructor: "Sister Johnson"
        },
        {
            sectionNum: 3,
            roomNum: "Online",
            enrolled: 31,
            days: "Online",
            instructor: "Brother Taylor"
        }
    ],

    changeEnrollment(sectionNum, add = true) {
        const selectedSection = this.sections.find(
            (section) => section.sectionNum === sectionNum
        );

        if (!selectedSection) {
            return {
                success: false,
                message: "The selected section could not be found."
            };
        }

        if (add) {
            selectedSection.enrolled += 1;

            return {
                success: true,
                message: `A student was enrolled in Section ${sectionNum}.`
            };
        }

        if (selectedSection.enrolled > 0) {
            selectedSection.enrolled -= 1;

            return {
                success: true,
                message: `A student was dropped from Section ${sectionNum}.`
            };
        }

        return {
            success: false,
            message: `Section ${sectionNum} has no enrolled students to remove.`
        };
    }
};

export default byuiCourse;