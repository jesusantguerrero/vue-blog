<template>
  <div>
		
    <vuetable ref="vuetable"
      :api-url="url"
      :fields="fields"
      pagination-path=""
      :sort-order="sortOrder"
      :multi-sort="true"
      detail-row-component="my-detail-row"
      :append-params="moreParams"
      @vuetable:cell-clicked="onCellClicked"
      @vuetable:pagination-data="onPaginationData"
    ></vuetable>

    <div class="vuetable-pagination">
      <vuetable-pagination-info ref="paginationInfo"
        info-class="pagination-info"
      ></vuetable-pagination-info>

      <vuetable-pagination ref="pagination"
        :css="css.pagination"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>

    </div>
  </div>
</template>

<script>
	import Vue from 'vue';
	import Vuetable from 'vuetable-2/src/components/Vuetable'
	import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
	import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

	export default {
		props: {
			url: {
				type: String,
				required: true
			},
			fields: {
				type: Array,
				required: true
			},
			sortOrder: {
				type: Object
			},
			moreParams: {
				type: Object
			}
		},
		components: {
			Vuetable,
			VuetablePagination,
			VuetablePaginationInfo
		}
	}
</script>
