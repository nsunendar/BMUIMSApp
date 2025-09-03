﻿using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using IMSWebApp.Function;
using IMSWebApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace IMSWebApp.Controllers.Production
{
    public class BillOfMaterialController : Controller
    {
        private readonly ILogger<BillOfMaterialController> _logger;
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;

        public BillOfMaterialController(ILogger<BillOfMaterialController> logger, IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
        }

        [Authorize]
        [HttpGet]
        [Route("/Production/BillOfMaterial")]
        public async Task<IActionResult> Index()
        {
            var currentMenu = "PRD";
            var userName = CF.DecryptString(_configuration["EKey"], HttpContext.User.FindFirstValue("userName"));
            ViewData["userName"] = userName;
            ViewData["currentMenu"] = currentMenu;
            ViewData["currentMenuName"] = "Production Management";
            ViewData["MenuItems"] = await api.GetSideMenu(_configuration["ApiEndpoint"] + _configuration["MenuItemModulEndpoint"], _configuration["ApiKey"], _httpClientFactory.CreateClient(), new StringContent(JsonConvert.SerializeObject(new SPParameters { USERNAME = userName, DATA = currentMenu }), System.Text.Encoding.UTF8, "application/json"));
            return View();
        }

        [Authorize]
        [HttpGet]
        [Route("Production/BillOfMaterial/GetDataLevelFG")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> GetDataLevelFG(DataSourceLoadOptions loadOptions)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                string apiKey = _configuration["ApiKey"];
                client.DefaultRequestHeaders.Add("ApiKey", apiKey);
                string apiUrl = _configuration["ApiEndpoint"] + _configuration["BOMLevelFGEndpoint"];
                HttpResponseMessage response = await client.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    var levelFGList = JsonConvert.DeserializeObject<List<BOMItems>>(responseContent);
                    return Ok(DataSourceLoader.Load(levelFGList, loadOptions));
                }
                else
                {
                    var errorResponse = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, errorResponse);
                }
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("Production/BillOfMaterial/GetDataLevelRM")]
        public async Task<IActionResult> GetDataLevelRM([FromQuery] string parentItem, DataSourceLoadOptions loadOptions)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                string apiKey = _configuration["ApiKey"];
                client.DefaultRequestHeaders.Add("ApiKey", apiKey);
                string apiUrl = _configuration["ApiEndpoint"] + _configuration["BOMLevelRMEndpoint"];

                var json = JsonConvert.SerializeObject(parentItem);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.GetAsync(apiUrl + "/" + parentItem);


                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    var levelRMList = JsonConvert.DeserializeObject<List<BOMItems>>(responseContent);
                    return Ok(DataSourceLoader.Load(levelRMList, loadOptions));
                }
                else
                {
                    var errorResponse = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, errorResponse);
                }
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet]
        [Route("Production/BillOfMaterial/GetDataLevelCP")]
        public async Task<IActionResult> GetDataLevelCP([FromQuery] string parentItem, DataSourceLoadOptions loadOptions)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                string apiKey = _configuration["ApiKey"];
                client.DefaultRequestHeaders.Add("ApiKey", apiKey);
                string apiUrl = _configuration["ApiEndpoint"] + _configuration["BOMLevelRMEndpoint"];

                var json = JsonConvert.SerializeObject(parentItem);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.GetAsync(apiUrl + "/" + parentItem);


                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    var levelCPList = JsonConvert.DeserializeObject<List<BOMItems>>(responseContent);
                    return Ok(DataSourceLoader.Load(levelCPList, loadOptions));
                }
                else
                {
                    var errorResponse = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, errorResponse);
                }
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("Production/BillOfMaterial/Edit")]
        public async Task<IActionResult> EditBOM(int id, DataSourceLoadOptions loadOptions)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                string apiKey = _configuration["ApiKey"];
                client.DefaultRequestHeaders.Add("ApiKey", apiKey);
                string apiUrl = _configuration["ApiEndpoint"] + _configuration["BOMInventoryByIdEndpoint"];

                var json = JsonConvert.SerializeObject(id);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync(apiUrl, content);


                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    var bomList = JsonConvert.DeserializeObject<List<BOMItems>>(responseContent);
                    var bomItem = bomList.FirstOrDefault(i => i.Id == id);
                    return PartialView("_BOMEdit", bomItem);
                }
                else
                {
                    var errorResponse = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, errorResponse);
                }
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [ValidateAntiForgeryToken]
        [HttpPost]
        [Route("Production/BillOfMaterial/UpdateBOMFG")]
        public async Task<IActionResult> UpdateBOMFG()
        {
            try
            {
                var form = await HttpContext.Request.ReadFormAsync();
                if (form == null)
                {
                    return BadRequest("No form data received");
                }

                var sBussCode = form["BussCode"];
                var sPlantCode = form["PlantCode"];
                var sItemName = form["ItemName"];
                var sStatus = form["Status"] == "on" ? true : false;
                var sQtyUsage = Convert.ToDecimal(form["QtyUsage"]);
                var sSatuan = form["Satuan"];
                //var sLevelSeqn = Convert.ToInt32("1");
                //var sParentId = form["ParentId"];
                //var sParentItem = form["ParentItem"];
                //var sInsertUser = CF.DecryptString(_configuration["EKey"], HttpContext.User.FindFirstValue("userName"));

                var brand = new BOMItems
                {
                    BussCode = sBussCode,
                    PlantCode = sPlantCode,
                    ItemName = sItemName,
                    Status = sStatus,
                    QtyUsage = sQtyUsage,
                    Satuan = sSatuan,
                    LevelSeqn = 0,
                    ParentId = 0,
                    ParentItem = ""
                };

                var json = JsonConvert.SerializeObject(brand);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var client = _httpClientFactory.CreateClient();
                string apiKey = _configuration["ApiKey"];
                client.DefaultRequestHeaders.Add("ApiKey", apiKey);
                string apiUrl = _configuration["ApiEndpoint"] + _configuration["InvBrandUpdateEndpoint"];

                HttpResponseMessage response = await client.PutAsync(apiUrl, content);

                if (response.IsSuccessStatusCode)
                {
                    return Ok(new { message = "Brand updated successfully.!" });
                }
                else
                {
                    var errorResponse = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, errorResponse);
                }
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                return StatusCode((int)HttpStatusCode.InternalServerError, "An error occurred: " + ex.Message);
            }
        }

        [Authorize]
        [ValidateAntiForgeryToken]
        [HttpPost]
        [Route("Production/BillOfMaterial/InsertBOMFG")]
        public async Task<IActionResult> InsertBOMFG()
        {
            try
            {
                var form = await HttpContext.Request.ReadFormAsync();
                if (form == null)
                {
                    return BadRequest("No form data received");
                }

                var sBussCode = form["BussCode"];
                var sPlantCode = form["PlantCode"];
                var sItemName = form["ItemName"];
                var sStatus = form["Status"] == "on" ? true : false;
                var sQtyUsage = Convert.ToDecimal(form["QtyUsage"]);
                var sSatuan = form["Satuan"];
                //var sLevelSeqn = Convert.ToInt32("1");
                var sParentId = Convert.ToInt32(string.IsNullOrEmpty(form["ParentId"]) ? 0 : form["ParentId"]);  //form["ParentId"];
                var sParentItem = string.IsNullOrEmpty(form["ParentItem"]) ? "" : form["ParentItem"]);  //form["ParentItem"];
                //var sInsertUser = CF.DecryptString(_configuration["EKey"], HttpContext.User.FindFirstValue("userName"));

                var brand = new BOMItems
                {
                    BussCode = sBussCode,
                    PlantCode = sPlantCode,
                    ItemName = sItemName,
                    Status = sStatus,
                    QtyUsage = sQtyUsage,
                    Satuan = sSatuan,
                    LevelSeqn = 0,
                    ParentId = sParentId,
                    ParentItem = sParentItem
                };

                var json = JsonConvert.SerializeObject(brand);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var client = _httpClientFactory.CreateClient();
                string apiKey = _configuration["ApiKey"];
                client.DefaultRequestHeaders.Add("ApiKey", apiKey);
                string apiUrl = _configuration["ApiEndpoint"] + _configuration["InvBrandUpdateEndpoint"];

                HttpResponseMessage response = await client.PutAsync(apiUrl, content);

                if (response.IsSuccessStatusCode)
                {
                    return Ok(new { message = "Brand updated successfully.!" });
                }
                else
                {
                    var errorResponse = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, errorResponse);
                }
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                return StatusCode((int)HttpStatusCode.InternalServerError, "An error occurred: " + ex.Message);
            }
        }

    }
}
