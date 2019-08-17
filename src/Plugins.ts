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
    }
];
