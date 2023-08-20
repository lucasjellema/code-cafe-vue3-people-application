<script setup>
import { usePeopleStore } from './stores/peopleStore';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { ref, computed } from 'vue';

const allExpandedRows = ref([]);
const expandAll = () => {
  allExpandedRows.value = peopleStore.people.filter((p) => p.id);
};
const collapseAll = () => {
  allExpandedRows.value = null;
};

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  countryOfOrigin: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const peopleStore = usePeopleStore();
</script>

<template>
  <h1>People</h1>
  <DataTable
    :value="peopleStore.people"
    tableStyle="min-width: 50rem"
    reorderableColumns
    v-model:filters="filters"
    :globalFilterFields="['first_name', 'last_name', 'city', 'countryOfOrigin']"
    filterDisplay="row"
    v-model:expandedRows="allExpandedRows"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <InputText v-model="filters['global'].value" placeholder="search for" />
      </div>
      <div class="flex flex-wrap justify-content-end gap-2">
        <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
        <Button
          text
          icon="pi pi-minus"
          label="Collapse All"
          @click="collapseAll"
        />
      </div>
    </template>
    <Column expander style="width: 5rem" />
    <Column field="first_name" header="First Name" sortable> </Column>
    <Column field="last_name" header="Last Name" sortable> </Column>
    <Column field="city" header="City" sortable> </Column>
    <Column field="countryOfOrigin" header="Country" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          class="p-column-filter"
          placeholder="Search by country"
        />
      </template>
    </Column>
    <Column field="favoriteColor" header="Favorite Color" sortable>
      <template #body="slotProps">
        <span
          class="flex align-items-center gap-2"
          :style="`background-color:${slotProps.data.favoriteColor}`"
        >
          {{ slotProps.data.favoriteColor }}
        </span>
      </template>
    </Column>
    <template #expansion="slotProps">
      <div class="p-3">
        <h5>Details</h5>
        <p>Job: {{ slotProps.data.job_title }}</p>
        <p>Email: {{ slotProps.data.email }}</p>
        <p>Street: {{ slotProps.data.street }}</p>
        <p>Shirt Size: {{ slotProps.data.shirtSize }}</p>
        <p>Birth Date: {{ slotProps.data.birthDate }}</p>
      </div>
    </template>
  </DataTable>
</template>
