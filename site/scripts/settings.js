import consts from './constants.js';
import { closeModal, showModal } from './modals.js';
import {
  initializeLibrary,
  setSortOrder,
  setFilterTracking,
  setActiveTabId,
  setFilterStatus,
  setFilterSource,
  sortOrder,
  filterStatus,
  filterSource,
  filterTracking,
  filterUnread,
  matchesUnread,
} from './library.js';

const sortOrderSelect = document.getElementById('sort-order');
const sortAscending = document.getElementById('sort-ascending');
const filterStatusSelect = document.getElementById('filter-status');
const filterSourceSelect = document.getElementById('filter-source');
//const highlightTrackerCheckbox = document.getElementById('highlight-tracker');
const filterTrackedSelect = document.getElementById('filter-tracked');

//filterTrackedSelect.addEventListener('change', applySettings);

export function openSettingsModal() {
  this.firstChild.style.transform = 'rotate(90deg)';
  sortOrderSelect.value = parseInt(sortOrder) < 64 ? sortOrder : parseInt(sortOrder) - 64;
  sortAscending.checked = parseInt(sortOrder) >= 64;
  for (const option of filterStatusSelect.options) {
    if (filterStatus.includes(option.value)) {
      option.selected = true;
    }
  }
  for (const option of filterSourceSelect.options) {
    if (option.value.split(',').every(uid => filterSource.includes(uid))) {
      option.selected = true;
    }
  }
  filterTrackedSelect.value = filterTracking;
  consts.filterUnread.value = filterUnread;

  showModal('settings-modal');
}

export function closeSettingsModal() {
  document.getElementById('settings-icon').firstChild.style.transform = 'rotate(0deg)';
  closeModal('settings-modal');
}

export function applySettings() {
  // Store the current active tab ID before reinitializing
  //window.activeTabId = document.querySelector('.tab-content.active').id;
  setActiveTabId(document.querySelector('.tab-content.active').id);
  //window.sortOrder = sortOrderSelect.value;
  setSortOrder(parseInt(sortOrderSelect.value) + (sortAscending.checked ? 64 : 0));

  var tempFilterStatus = [];
  for (const option of filterStatusSelect.options) {
    if (option.selected) {
      tempFilterStatus.push(option.value);
    }
  }
  setFilterStatus(tempFilterStatus);

  var tempFilterSource = [];
  for (const option of filterSourceSelect.options) {
    if (option.selected) {
      option.value.split(',').forEach(uid => tempFilterSource.push(uid));
    }
  }
  setFilterSource(tempFilterSource);

  //window.filterTracking = filterTrackedSelect.value;
  setFilterTracking(filterTrackedSelect.value);

  // Save sortOrder to local storage
  localStorage.setItem('MBV_SortOrder', sortOrder);

  // Save Unread filter
  matchesUnread();

  //const highlightTracker = highlightTrackerCheckbox.checked;

  console.log('Settings applied:', { sortOrder, filterStatus, filterSource, filterTracking });

  closeSettingsModal();
  initializeLibrary();
}