// @flow

const dataUrl = 'https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json';
const dataList = [];
const areaList = [];
let filterData = [];

const contentSelect = document.querySelector('.select-area');
const tbody = document.querySelector('.tbody');

function setAreaList() {
    dataList.forEach(value => {
        if (areaList.indexOf(value.CaseLocationDistrict) === -1) {
            areaList.push(value.CaseLocationDistrict);
        }
    });
}

function createAreaSelect () {
    let areaOptions = `
        <option value="" disabled selected>-- 請選擇行政區 --</option>
        <option value="全區">全區最新動態</option>
    `;
    
    areaOptions = areaOptions.concat(areaList.map(item => (`<option value="${item}">${item}</option>`)).join(''));

    contentSelect.innerHTML = areaOptions;
}

function selectArea() {
    if (contentSelect.selectedOptions[0].text === '全區最新動態') {
        filterData = dataList;
    } else {
        filterData = dataList.filter(data => (data.CaseLocationDistrict === contentSelect.selectedOptions[0].text));
    }

    if (filterData.length === 0) {
        return;
    }

    creatTable();
}

function creatTable () {
    if (filterData.length === 0) {
        return;
    }

    let table = [];

    filterData.forEach(value => {
        table.push(`
        <tr class="info-tr" caseID="${value.CaseID}">
            <td>${value.CaseTime}</td>
            <td>${value.CaseLocationDistrict}</td>
            <td>${value.CaseLocationDescription}</td>
            <td>${value.CaseDescription}</td>
        </tr>
        `);
    });

    tbody.innerHTML = table.join('');
}

fetch(dataUrl, { method: 'GET' })
  .then(response => {
    // ok 代表狀態碼在範圍 200 ~ 299
    if (!response.ok) {
      // showNetworkErrorMessage();
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then(promiseValue => {
    const caseList = promiseValue.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
    dataList.push(...caseList);
    setAreaList();
    createAreaSelect();
  })
  .catch(error => {

 }
);

contentSelect.addEventListener('change', selectArea);
