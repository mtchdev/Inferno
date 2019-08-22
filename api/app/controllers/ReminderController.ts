import { Controller } from 'vendor/astro/http/Controller';
import { Request } from 'express';
import { Reminder } from 'app/models/Reminder';

export class ReminderController extends Controller {
    
    constructor(data) {
        super(data);
    }

}
