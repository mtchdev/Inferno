import { Controller } from 'vendor/astro/http/Controller';
import { Request } from 'express';
import { Note } from 'app/models/Note';

export class NoteController extends Controller {
    
    constructor(data) {
        super(data);
    }

    async addNoteToUser(request: Request) {
        let userId: string = request.params.userId;
        let input: any = request.body;

        try {
            let note = new Note();
            note.author_id = input.author;
            note.user_id = userId;
            note.content = input.content;

            await this.db.save(note);

            this.respondWithSuccess(note);
        } catch (e) {
            this.respondWithError(e);
        }
    }

}
