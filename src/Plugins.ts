import { Ignite } from './plugins/IgnitePlugin';

interface Plugin {
    trigger: string;
    component: any | Ignite.IgnitePlugin; //set any for now, we cant do much
}

/**
 * Import plugins
 */

import { TestCommand } from 'src/plugins/test';
import { SettingsCommand } from 'src/plugins/admin/Settings';
import { WarnCommand } from 'src/plugins/moderation/Warn';

export const plugins: Array<Plugin> = [
    {
        trigger: 'test',
        component: TestCommand
    },
    {
        trigger: 'settings',
        component: SettingsCommand
    },
    {
        trigger: 'warn',
        component: WarnCommand
    }
];
