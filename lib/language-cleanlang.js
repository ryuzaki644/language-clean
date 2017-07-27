'use babel';

import LanguageCleanlangView from './language-cleanlang-view';
import { CompositeDisposable } from 'atom';

export default {

  languageCleanlangView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageCleanlangView = new LanguageCleanlangView(state.languageCleanlangViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageCleanlangView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-cleanlang:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageCleanlangView.destroy();
  },

  serialize() {
    return {
      languageCleanlangViewState: this.languageCleanlangView.serialize()
    };
  },

  toggle() {
    console.log('LanguageCleanlang was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
