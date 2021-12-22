import {Router} from 'express'
import {check} from 'express-validator'

import { get_events,send_events,update_events,delete_events } from '../controllers/events_control.js'
import { isDate } from '../helpers/isDate.js'
import {validation} from '../middlewares/validation.js'

const route_event = Router()


route_event.get("/", get_events)

route_event.post(
    "/",
    [
        check("title","title is importante").not().isEmpty(),
        check("start","date incorrect").custom(isDate),
        check("end","date incorrect").custom(isDate),
        validation
    ], 
    send_events
)

route_event.put("/:id",update_events)

route_event.delete("/:id", delete_events)

export default route_event