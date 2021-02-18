sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function (BaseController, MessageBox, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.ibm.warehouseDashboard.controller.Page1", {
		handleRouteMatched: function (oEvent) {
			var sAppId = "App5fd96e46e38c0674e225fb61";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function (oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype" && prop.includes("Set")) {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		applyFiltersAndSorters: function (sControlId, sAggregationName, chartBindingInfo) {
			if (chartBindingInfo) {
				var oBindingInfo = chartBindingInfo;
			} else {
				var oBindingInfo = this.getView().byId(sControlId).getBindingInfo(sAggregationName);
			}
			var oBindingOptions = this.updateBindingOptions(sControlId);
			this.getView().byId(sControlId).bindAggregation(sAggregationName, {
				model: oBindingInfo.model,
				path: oBindingInfo.path,
				parameters: oBindingInfo.parameters,
				template: oBindingInfo.template,
				templateShareable: true,
				sorter: oBindingOptions.sorters,
				filters: oBindingOptions.filters
			});

		},
		updateBindingOptions: function (sCollectionId, oBindingData, sSourceId) {
			this.mBindingOptions = this.mBindingOptions || {};
			this.mBindingOptions[sCollectionId] = this.mBindingOptions[sCollectionId] || {};

			var aSorters = this.mBindingOptions[sCollectionId].sorters;
			var aGroupby = this.mBindingOptions[sCollectionId].groupby;

			// If there is no oBindingData parameter, we just need the processed filters and sorters from this function
			if (oBindingData) {
				if (oBindingData.sorters) {
					aSorters = oBindingData.sorters;
				}
				if (oBindingData.groupby || oBindingData.groupby === null) {
					aGroupby = oBindingData.groupby;
				}
				// 1) Update the filters map for the given collection and source
				this.mBindingOptions[sCollectionId].sorters = aSorters;
				this.mBindingOptions[sCollectionId].groupby = aGroupby;
				this.mBindingOptions[sCollectionId].filters = this.mBindingOptions[sCollectionId].filters || {};
				this.mBindingOptions[sCollectionId].filters[sSourceId] = oBindingData.filters || [];
			}

			// 2) Reapply all the filters and sorters
			var aFilters = [];
			for (var key in this.mBindingOptions[sCollectionId].filters) {
				aFilters = aFilters.concat(this.mBindingOptions[sCollectionId].filters[key]);
			}

			// Add the groupby first in the sorters array
			if (aGroupby) {
				aSorters = aSorters ? aGroupby.concat(aSorters) : aGroupby;
			}

			var aFinalFilters = aFilters.length > 0 ? [new sap.ui.model.Filter(aFilters, true)] : undefined;
			return {
				filters: aFinalFilters,
				sorters: aSorters
			};

		},
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Page1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

			var oView = this.getView(),
				oData = {},
				self = this;
			var oModel = new sap.ui.model.json.JSONModel();
			oView.setModel(oModel, "staticDataModel");
			self.oBindingParameters = {};

			oData["sap_Worklist_Page_0-content-sap_chart_PieChart-1613612270868"] = {};

			oData["sap_Worklist_Page_0-content-sap_chart_PieChart-1613612270868"]["data"] = [{
				"dim0": "Items left to Pick",
				"mea0": "296",
				"__id": 0
			}, {
				"dim0": "Items Picked",
				"mea0": "133",
				"__id": 1
			}, {
				"dim0": "Completion Percentage",
				"mea0": "489",
				"__id": 2
			}];

			self.oBindingParameters['sap_Worklist_Page_0-content-sap_chart_PieChart-1613612270868'] = {
				"path": "/sap_Worklist_Page_0-content-sap_chart_PieChart-1613612270868/data",
				"model": "staticDataModel",
				"parameters": {}
			};

			oData["sap_Worklist_Page_0-content-sap_chart_PieChart-1613612270868"]["vizProperties"] = {
				"plotArea": {
					"dataLabel": {
						"visible": true,
						"hideWhenOverlap": true
					}
				}
			};

			oData["sap_Worklist_Page_0-content-sap_m_HBox-1613612452380-items-sap_chart_PieChart-1613612475525"] = {};

			oData["sap_Worklist_Page_0-content-sap_m_HBox-1613612452380-items-sap_chart_PieChart-1613612475525"]["data"] = [{
				"dim0": "Items for Putaway",
				"mea0": "296",
				"__id": 0
			}, {
				"dim0": "Items Putaway",
				"mea0": "133",
				"__id": 1
			}, {
				"dim0": "Completion Percentage",
				"mea0": "489",
				"__id": 2
			}];

			self.oBindingParameters['sap_Worklist_Page_0-content-sap_m_HBox-1613612452380-items-sap_chart_PieChart-1613612475525'] = {
				"path": "/sap_Worklist_Page_0-content-sap_m_HBox-1613612452380-items-sap_chart_PieChart-1613612475525/data",
				"model": "staticDataModel",
				"parameters": {}
			};

			oData["sap_Worklist_Page_0-content-sap_m_HBox-1613612452380-items-sap_chart_PieChart-1613612475525"]["vizProperties"] = {
				"plotArea": {
					"dataLabel": {
						"visible": true,
						"hideWhenOverlap": true
					}
				}
			};

			oView.getModel("staticDataModel").setData(oData, true);

			function dateDimensionFormatter(oDimensionValue, sTextValue) {
				var oValueToFormat = sTextValue !== undefined ? sTextValue : oDimensionValue;
				if (oValueToFormat instanceof Date) {
					var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
						style: "short"
					});
					return oFormat.format(oValueToFormat);
				}
				return oValueToFormat;
			}

			var aDimensions = oView.byId("sap_Worklist_Page_0-content-sap_chart_PieChart-1613612270868").getDimensions();
			aDimensions.forEach(function (oDimension) {
				oDimension.setTextFormatter(dateDimensionFormatter);
			});

			var aDimensions = oView.byId("sap_Worklist_Page_0-content-sap_m_HBox-1613612452380-items-sap_chart_PieChart-1613612475525").getDimensions();
			aDimensions.forEach(function (oDimension) {
				oDimension.setTextFormatter(dateDimensionFormatter);
			});

		},
		onExit: function () {

			// to destroy templates for bound aggregations when templateShareable is true on exit to prevent duplicateId issue
			var aControls = [{
				"controlId": "sap_Worklist_Page_0-content-sap_m_IconTabBar-1-items-sap_m_IconTabFilter-1-content-build_simple_Table-1",
				"groups": ["items"]
			}];
			for (var i = 0; i < aControls.length; i++) {
				var oControl = this.getView().byId(aControls[i].controlId);
				if (oControl) {
					for (var j = 0; j < aControls[i].groups.length; j++) {
						var sAggregationName = aControls[i].groups[j];
						var oBindingInfo = oControl.getBindingInfo(sAggregationName);
						if (oBindingInfo) {
							var oTemplate = oBindingInfo.template;
							oTemplate.destroy();
						}
					}
				}
			}

		},
		onAfterRendering: function () {

			var oChart,
				self = this,
				oBindingParameters = this.oBindingParameters,
				oView = this.getView();

			oChart = oView.byId("sap_Worklist_Page_0-content-sap_chart_PieChart-1613612270868");
			oChart.bindData(oBindingParameters['sap_Worklist_Page_0-content-sap_chart_PieChart-1613612270868']);

			oChart = oView.byId("sap_Worklist_Page_0-content-sap_m_HBox-1613612452380-items-sap_chart_PieChart-1613612475525");
			oChart.bindData(oBindingParameters['sap_Worklist_Page_0-content-sap_m_HBox-1613612452380-items-sap_chart_PieChart-1613612475525']);

		}
	});
}, /* bExport= */ true);