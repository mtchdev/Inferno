import { Controller } from 'vendor/astro/http/Controller';
import { Request } from 'express';
import { Note } from 'app/models/Note';

export class NoteController extends Controller {
    
    constructor(data) {
        super(data);
    }

}
