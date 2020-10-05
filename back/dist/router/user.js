"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controller/user.controller");
var router = express_1.Router();
router.get('/', user_controller_1.getUsers);
exports.default = router;
//# sourceMappingURL=user.js.map