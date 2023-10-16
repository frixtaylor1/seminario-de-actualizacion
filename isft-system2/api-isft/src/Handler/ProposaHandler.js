class ProposalHandler {
  constructor() {
    this.listOfProposal = [];
  }

  addAProposal(originIdUser, targetIdUser) {
    if (this.__validateProposal(originIdUser, targetIdUser)) {
      this.listOfProposal.push({
        originIdUser: originIdUser,
        targetIdUser: targetIdUser
      });
    }
  }

  __validateProposal(originIdUser, targetIdUser) {
    const proposalData = {
      originIdUser: originIdUser,
      targetIdUser: targetIdUser
    };
    
    const selected = this.listOfProposal.find((proposal) => (
      proposal.originIdUser === proposalData.originIdUser &&
      proposal.targetIdUser === proposalData.targetIdUser
    ));

    return !selected;
  }
}

const proposalHandler = new ProposalHandler();

module.exports = { proposalHandler };