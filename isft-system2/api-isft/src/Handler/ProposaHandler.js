class ProposalHandler {
  constructor() {
    this.listOfProposal = new Array();
  }

  addAProposal(originIdUser, targetIdUser) {
    if (this.__validateProposal(originIdUser, targetIdUser)) {
      this.listOfProposal.push({
        'originIdUser': originIdUser,
        'targetIdUser': targetIdUser
      });
    }
  }

  __validateProposal(originIdUser, targetIdUser) {
    let proposalData = {
      'originIdUser': originIdUser,
      'targetIdUser': targetIdUser
    }
    let selected = proposalHandler.listOfProposal.find((proposal) => proposal === proposalData);
    return (selected === undefined ? true : false); 
  }
};

const proposalHandler = new ProposalHandler();

module.exports = { proposalHandler };