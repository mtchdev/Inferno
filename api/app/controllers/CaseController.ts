import { Controller } from 'vendor/astro/http/Controller';
import { Request } from 'express';
import { Case } from 'app/models/Case';

export class CaseController extends Controller {
    
    constructor(data) {
        super(data);
    }

}
