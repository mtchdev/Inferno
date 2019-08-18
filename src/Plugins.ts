interface Plugin {
    trigger: string;
    component: any
    canActivate?: any
}

/**
 * Import plugins
 */

import { TestCommand } from 'src/plugins/test';
import { SettingsCommand } from 'src/plugins/admin/Settings';
import { WarnCommand } from 'src/plugins/moderation/Warn';
import { CasesCommand } from 'src/plugins/moderation/Cases';
import { RemoveCaseCommand } from 'src/plugins/moderation/RemoveCase';
import { CaseCommand } from 'src/plugins/moderation/Case';
import { NoteCommand } from 'src/plugins/moderation/Note';
import { NotesCommand } from 'src/plugins/moderation/Notes';
import { RemoveNoteCommand } from 'src/plugins/moderation/RemoveNote';
import { ServerInfoCommand } from 'src/plugins/utility/ServerInfo';
import { HelpCommand } from 'src/plugins/utility/Help';

/**
 * Middleware
 */
import { IsAdmin } from 'src/util/middleware/IsAdmin';
import { IsModerator } from 'src/util/middleware/isModerator';

export const plugins: Array<Plugin> = [
    {
        trigger: 'test',
        component: TestCommand,
        canActivate: IsAdmin
    },
    {
        trigger: 'settings',
        component: SettingsCommand
    },
    {
        trigger: 'warn',
        component: WarnCommand
    },
    {
        trigger: 'cases',
        component: CasesCommand
    },
    {
        trigger: 'removecase',
        component: RemoveCaseCommand
    },
    {
        trigger: 'case',
        component: CaseCommand
    },
    {
        trigger: 'note',
        component: NoteCommand
    },
    {
        trigger: 'notes',
        component: NotesCommand
    },
    {
        trigger: 'removenote',
        component: RemoveNoteCommand
    },
    {
        trigger: 'serverinfo',
        component: ServerInfoCommand
    },
    {
        trigger: 'help',
        component: HelpCommand
    }
];
