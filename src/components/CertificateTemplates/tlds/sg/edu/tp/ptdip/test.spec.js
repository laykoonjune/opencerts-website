import { Selector } from "testcafe";

fixture("Temasek Polytechnic").page`http://localhost:3000`;

const Certificate = "./sample.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Part-time Diploma is rendered correctly.", async t => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "DUMMY STUDENT NAME",
    "DUMMY COURSE NAME"
  ]);

  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "DUMMY STUDENT NAME",
    "S0000000A",
    "1234567A",
    "DUMMY COURSE NAME",
    "S001",
    "Dummy01 subject name",
    "Cumulative Grade Point Average",
    "5.0",
    "Certificate/Diploma Awarded",
    "POST-DIPLOMA DUMMY CERTIFICATE NAME",
    "Grading System"
  ]);
});