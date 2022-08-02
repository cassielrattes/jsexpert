import TableComponent from "../../shared/base/tableComponent.mjs";

export default class TableBrowserComponent extends TableComponent {
    render(data) {
        const template = this.prepareData(data);

        document.body.insertAdjacentHTML("afterBegin", template);
    }

    prepareData(data) {
        const [firstItem] = data;
        const tHeaders = Object.keys(firstItem)
            .map(text => `<th scope=col>${text}</th>`);

        const joinLists = list => list.join('');

        const tBodyValues = data
            .map(item => Object.values(item))
            .map(item => item.map(values => `<td>${values}</td>`))
            .map(ids => `<tr>${joinLists(ids)}</tr>`);

        const template = `
            <table class="table">
                <thead>
                <tr>
                    ${joinLists(tHeaders)}
                </tr>
                </thead>
                <tbody>
                    ${joinLists(tBodyValues)}
                </tbody>
            </table>
            `;

        return template;
    }
}