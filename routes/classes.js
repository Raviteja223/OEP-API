const express = require("express");

const router = express.Router();

const Examiner = require("./../schema/examiner");

// ========= CRUD for classes ============

// --------- CREATE ----------

// request format to add a class in the list of all classes:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
//      class: {
//          className: String,
//      }
// }

router.post("/", async (req, res) => {
    // res.send("/classes");
    try {
        await Examiner.findOneAndUpdate(
            {
                username: req.body.username,
                password: req.body.password,
            },
            {
                $addToSet: { classes: req.body.class },
            }
        );

        const foundElement = await Examiner.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if (foundElement === null) {
            res.json({ message: "no user exist" });
        } else {
            res.json(foundElement.classes);
        }
    } catch (err) {
        res.json({ message: "err" });
    }
});

// --------- READ ----------

// request format to get list of all classes:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
// }

router.get("/", async (req, res) => {
    // res.send("/classes");
    try {
        const foundElement = await Examiner.findOne(req.body);
        if (foundElement === null) {
            res.json({ message: "no user exist" });
        } else {
            res.json(foundElement.classes);
        }
    } catch (err) {
        res.json({ message: "err" });
    }
});

// --------- UPDATE ----------

// request format to update a class details:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
//      classId: String,
//      updatedClass: {
//          className: String,
//          candidates: [
//              {
//                  _id: String,
//                  candidateId: String,
//                  candidateName: String
//              },
//              {
//                  candidateId: String,
//                  candidateName: String
//              },
//          ]
//      }
// }

router.patch("/", async (req, res) => {
    // res.send("/classes");
    try {
        await Examiner.findOneAndUpdate(
            {
                username: req.body.username,
                password: req.body.password,
                "classes._id": req.body.updatedClass._id,
            },
            {
                $set: { "classes.$": req.body.updatedClass },
            }
        );

        const foundElement = await Examiner.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if (foundElement === null) {
            res.json({ message: "no user exist" });
        } else {
            res.json(foundElement);
        }
    } catch (err) {
        res.json({ message: "err" });
    }
});

// --------- DELETE ----------

// request format to delete a class:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
//      classId: Object ID (_Id)
// }

router.delete("/", async (req, res) => {
    // res.send("/classes");
    try {
        await Examiner.findOneAndUpdate(
            {
                username: req.body.username,
                password: req.body.password,
            },
            {
                $pull: {
                    classes: { _id: req.body.classId },
                },
            }
        );

        const foundElement = await Examiner.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if (foundElement === null) {
            res.json({ message: "no user exist" });
        } else {
            res.json(foundElement);
        }
    } catch (err) {
        res.json({ message: err });
    }
});

// ========= CRUD for candidates ============

// --------- CREATE ----------

// request format to get the list of candidates of a class:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
//      classId: Object Id
//      candidate: {
//          candidateId: String,
//          candidateName: String
//      }
// }

router.post("/candidates", async (req, res) => {
    // res.send("/classes/candidates");
    try {
        await Examiner.findOneAndUpdate(
            {
                username: req.body.username,
                password: req.body.password,
                "classes._id": req.body.classId,
            },
            {
                $addToSet: { candidates: req.body.candidate },
            }
        );

        const classFound = await Examiner.findOne(
            {
                username: req.body.username,
                password: req.body.password,
                "classes._id": req.body.classId,
            },
            {
                "classes.$": true,
            }
        );

        if (classFound === null) {
            res.json({ message: "no user exist" });
        } else {
            res.json(classFound.classes[0].candidates); //returns Array
        }
    } catch (err) {
        res.json({ message: "err" });
    }
});

// --------- READ ----------

// request format to get the list of candidates of a class:
// req = {
//     username: String,
//     password: String, | Should be the unhashed password.
//      classId: Object Id
// }

router.get("/candidates", async (req, res) => {
    // res.send("/classes/candidates");
    try {
        const classFound = await Examiner.findOne(
            {
                username: req.body.username,
                password: req.body.password,
                "classes._id": req.body.classId,
            },
            {
                "classes.$": true,
            }
        );

        if (classFound === null) {
            res.json({ message: "no user exist" });
        } else {
            res.json(classFound.classes[0].candidates); //returns Array
        }
    } catch (err) {
        res.json({ message: "err" });
    }
});

module.exports = router;
