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
            note.unix_added = Date.now() / 1000;
            note.guild_id = input.guildId;

            await this.db.save(note);

            this.respondWithSuccess(note);
        } catch (e) {
            this.respondWithError(e);
        }
    }

    async getNotes(request: Request) {
        let params: any = request.params;
        let notes: Array<Note> = await this.db.find(Note, {where:{user_id: params.userId, guild_id: params.guildId}});
        return this.respondWithSuccess(notes);
    }

    async removeNote(request: Request) {
        let noteId: string = request.params.noteId;

        let exists = await this.db.findOne(Note, {where: {id: noteId, guild_id: request.params.guildId}});
        if (!exists) {
            return this.respondWithError('NOTE_NOT_FOUND');
        }

        await this.db.getRepository(Note).remove(exists);

        this.respondWithSuccess();
    }

}
