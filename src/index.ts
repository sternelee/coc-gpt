import { commands, CompleteResult, ExtensionContext, listManager, sources, window, workspace } from 'coc.nvim';
import DemoList from './lists';

export async function activate(context: ExtensionContext): Promise<void> {
  window.showInformationMessage('coc-extension works!');

  context.subscriptions.push(
    commands.registerCommand('coc-extension.Command', async () => {
      window.showInformationMessage('coc-extension Commands works!');
    }),

    listManager.registerList(new DemoList()),

    sources.createSource({
      name: 'coc-extension completion source', // unique id
      doComplete: async () => {
        const items = await getCompletionItems();
        return items;
      },
    }),

    workspace.registerKeymap(
      ['n'],
      'extension-keymap',
      async () => {
        window.showInformationMessage('registerKeymap');
      },
      { sync: false }
    ),

    workspace.registerAutocmd({
      event: 'InsertLeave',
      request: true,
      callback: () => {
        window.showInformationMessage('registerAutocmd on InsertLeave');
      },
    })
  );
}

async function getCompletionItems(): Promise<CompleteResult> {
  return {
    items: [
      {
        word: 'TestCompletionItem 1',
        menu: '[coc-extension]',
      },
      {
        word: 'TestCompletionItem 2',
        menu: '[coc-extension]',
      },
    ],
  };
}
