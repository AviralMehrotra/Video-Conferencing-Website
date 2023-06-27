let handleMemberJoined = async (memberId) => {
  console.log("Member Joined", memberId);
  addMemberToDom(memberId);

  let members = await channel.getMembers();
  updateMemberTotal(members);
};

let addMemberToDom = async (memberId) => {
  let { name } = await rtmClient.getUserAttributesByKeys(memberId, ["name"]);

  let membersWrapper = document.getElementById("member_list");
  let memberItem = `<div class="member_wrapper" id="member-${memberId}_wrapper">
                        <span class="green_icon"></span>
                        <p class="member_name">${name}</p>
                    </div>`;

  membersWrapper.insertAdjacentHTML("beforeend", memberItem);
};

let updateMemberTotal = async (members) => {
  let total = document.getElementById("members_count");
  total.innerText = members.length;
};

let handleMemberLeft = async (memberId) => {
  remoteMemberFromDom(memberId);

  let members = await channel.getMembers();
  updateMemberTotal(members);
};

let remoteMemberFromDom = async (memberId) => {
  let memberWrapper = document.getElementById(`member_${memberId}_wrapper`);
  memberWrapper.remove();
};

let getMembers = async () => {
  let members = await channel.getMembers();
  updateMemberTotal(members);
  for (let i = 0; members.length > i; i++) {
    addMemberToDom(members[i]);
  }
};

let leaveChannel = async () => {
  await client.leave();
  await rtmClient.logout();
};

window.addEventListener("beforeunload", leaveChannel);
