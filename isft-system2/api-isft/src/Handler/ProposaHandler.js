class ProposalHandler {
  constructor() {
    this.listOfProposal = [];
  }

  addAProposal(originIdUser, targetIdUser, charUUID, status = 'waitToResponse') {
    let proposal = {
      originIdUser: originIdUser,
      targetIdUser: targetIdUser,
      chatId      : charUUID,
      status      : status,
    };

    if (this.__validateProposal(originIdUser, targetIdUser)) {
      this.listOfProposal.push(proposal);
    }
    return proposal;
  }

  removeProposal(proposalId) {
    this.listOfProposal[proposalId] = undefined;
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