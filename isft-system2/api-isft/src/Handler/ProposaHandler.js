class ProposalHandler {
  constructor() {
    this.listOfProposal = new Array();
  }

  addAProposal(originIdUser, targetIdUser) {
    this.listOfProposal.push({ 
      'originIdUser': originIdUser, 
      'targetIdUser': targetIdUser 
    });
  }
};

const proposalHandler = new ProposalHandler();

module.exports = { proposalHandler };