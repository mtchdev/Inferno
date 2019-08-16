import { Ignite } from './plugins/IgnitePlugin';

interface Plugin {
    trigger: string;
    component: any | Ignite.IgnitePlugin; //set any for now, we cant do much
}

/**
 * Import plugins
 */

import { TestCommand } from 'src/plugins/test';

export const plugins: Array<Plugin> = [
    {
        trigger: 'test',
        component: TestCommand
    }
];
