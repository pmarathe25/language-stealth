'use babel';

import LanguageStealthView from './language-stealth-view';
import { CompositeDisposable } from 'atom';

export default {

  languageStealthView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageStealthView = new LanguageStealthView(state.languageStealthViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageStealthView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-stealth:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageStealthView.destroy();
  },

  serialize() {
    return {
      languageStealthViewState: this.languageStealthView.serialize()
    };
  },

  toggle() {
    console.log('LanguageStealth was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
