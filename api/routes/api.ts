import { Http, RouteResponses } from 'vendor/astro/router/http';
import { Response, Request } from 'express';
const http = new Http();

/**
 * Place your routes below. Example is provided using the Route provider
 */

import { GuildController } from 'app/controllers/GuildController';
import { CaseController } from 'app/controllers/CaseController';
import { NoteController } from 'app/controllers/NoteController';
import { CommandController } from 'app/controllers/CommandController';

http.post('guild', (req: Request, res: Response) => new GuildController(res).addGuild(req));
http.get('guild/:id', (req: Request, res: Response) => new GuildController(res).getConfig(req));
http.get('guild/:guildId/commands', (req: Request, res: Response) => new CommandController(res).getCommands(req));
http.post('guild/:guildId/command', (req: Request, res: Response) => new CommandController(res).addCommand(req));
http.delete('guild/:guildId/command/:command', (req: Request, res: Response) => new CommandController(res).removeCommand(req));

// Settings
http.post('guild/prefix', (req: Request, res: Response) => new GuildController(res).setPrefix(req));
http.post('guild/:id/roles/mod', (req: Request, res: Response) => new GuildController(res).setModRole(req));
http.post('guild/:id/roles/admin', (req: Request, res: Response) => new GuildController(res).setAdminRole(req));

// Cases
http.post('case', (req: Request, res: Response) => new CaseController(res).addCase(req));
http.get('case/:id/:guildId', (req: Request, res: Response) => new CaseController(res).getCase(req));
http.put('case/:id', (req: Request, res: Response) => new CaseController(res).editCase(req));
http.delete('case/:id/:guildId', (req: Request, res: Response) => new CaseController(res).removeCase(req));
http.get('cases/:uid/:guildId', (req: Request, res: Response) => new CaseController(res).getCasesForUser(req));

// Notes
http.post('note/:userId', (req: Request, res: Response) => new NoteController(res).addNoteToUser(req));
http.get('notes/:userId', (req: Request, res: Response) => new NoteController(res).getNotes(req));
http.delete('note/:noteId', (req: Request, res: Response) => new NoteController(res).removeNote(req));

http.get('*', (req: Request, res: any) => {
    res.status(404).send(RouteResponses.NotFound(req));
});
