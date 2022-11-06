const form = document.querySelector("#issueInputForm");
form.addEventListener("submit", saveIssue);

function fetchIssues() {
  //grab all issues from localstorage and display them in issuesList div
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.querySelector(".issuesList");
  console.log(issues);
  issuesList.innerHTML = "";
  for (issue of issues) {
    let statusColor =
      issue.status === "Closed" ? "label-success" : "label-info";

    issuesList.innerHTML +=
      `<div class="well"` +
      "<h6>Issue ID: " +
      issue.id +
      "</h6>" +
      '<p><span class="label ' +
      statusColor +
      ' " </span>' +
      issue.status +
      "<h3>" +
      issue.subject +
      "</h3>" +
      "<p>" +
      issue.description +
      "</p>";
  }
}
fetchIssues();

function saveIssue(e) {
  const issueId = chance.guid();
  let issueSubject = document.getElementById("issueSubjectInput").value;
  let issueDesc = document.getElementById("issueDescInput").value;
  let issueSeverity = document.getElementById("issueSeverityInput").value;
  let issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  let issueStatus = "Open";

  let issue = {
    id: issueId,
    subject: issueSubject,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  };
  // less readable now, good job on refactoring me!
  let issues = localStorage.getItem("issues");
  issues = issues ? JSON.parse(localStorage.getItem("issues")) : [];
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));

  form.reset();
  fetchIssues();
  e.preventDefault();
}
