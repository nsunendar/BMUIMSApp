using IMSWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace IMSWebApi.Controllers
{
    [ApiController]
    public class BOMController : ControllerBase
    {
        private readonly SqlConnection? _connection;

        public BOMController(SqlConnection connection)
        {
            _connection = connection;
        }

        [Route("/[controller]/getDataBOMInventory")]
        [HttpPost]
        public async Task<IActionResult> GetDataBOMInventory([FromBody] SPParameters parUsername)
        {
            try
            {
                await _connection.OpenAsync();

                using (var command = new SqlCommand("spmGetBOMInventory", _connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@BussCode", parUsername.ACTIVEBRANCH);
                    command.Parameters.AddWithValue("@paraSP", parUsername.DATA);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        var itemList = new List<BOMHItem>();
                        var properties = typeof(BOMHItem).GetProperties();
                        while (await reader.ReadAsync())
                        {
                            BOMHItem item = new();
                            foreach (var property in properties)
                            {
                                if (!reader.IsDBNull(reader.GetOrdinal(property.Name)))
                                {
                                    var value = reader[property.Name];

                                    if (value == DBNull.Value && Nullable.GetUnderlyingType(property.PropertyType) != null)
                                    {
                                        property.SetValue(item, null);
                                    }
                                    else
                                    {
                                        property.SetValue(item, value);
                                    }
                                }
                            }
                            itemList.Add(item);
                        }
                        await _connection.CloseAsync();
                        return Ok(itemList);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Can't Load GetDataInventory " + ex.Message);
            }
        }

        [Route("/[controller]/getDataBOMInventoryById")]
        [HttpPost]
        public async Task<IActionResult> GetDataBOMInventoryById([FromBody] int id)
        {
            try
            {
                await _connection.OpenAsync();

                using (var command = new SqlCommand("spmGetBOMInventoryByID", _connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id", id);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        var itemList = new List<BOMHItem>();
                        var properties = typeof(BOMHItem).GetProperties();
                        while (await reader.ReadAsync())
                        {
                            BOMHItem item = new();
                            foreach (var property in properties)
                            {
                                if (!reader.IsDBNull(reader.GetOrdinal(property.Name)))
                                {
                                    var value = reader[property.Name];

                                    if (value == DBNull.Value && Nullable.GetUnderlyingType(property.PropertyType) != null)
                                    {
                                        property.SetValue(item, null);
                                    }
                                    else
                                    {
                                        property.SetValue(item, value);
                                    }
                                }
                            }
                            itemList.Add(item);
                        }
                        await _connection.CloseAsync();
                        return Ok(itemList);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Can't Load GetCustomerById" + ex.Message);
            }
        }

        [Route("/[controller]/getDataBOMMaterialById")]
        [HttpPost]
        public async Task<IActionResult> GetDataBOMMaterialById([FromBody] SPParameters parUsername)
        {
            try
            {
                await _connection.OpenAsync();

                using (var command = new SqlCommand("spmGetBOMMaterialByInv", _connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@BussCode", parUsername.ACTIVEBRANCH);
                    command.Parameters.AddWithValue("@paraSP", parUsername.DATA);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        var itemList = new List<BOMMaterial>();
                        var properties = typeof(BOMMaterial).GetProperties();
                        while (await reader.ReadAsync())
                        {
                            BOMMaterial item = new();
                            foreach (var property in properties)
                            {
                                if (!reader.IsDBNull(reader.GetOrdinal(property.Name)))
                                {
                                    var value = reader[property.Name];

                                    if (value == DBNull.Value && Nullable.GetUnderlyingType(property.PropertyType) != null)
                                    {
                                        property.SetValue(item, null);
                                    }
                                    else
                                    {
                                        property.SetValue(item, value);
                                    }
                                }
                            }
                            itemList.Add(item);
                        }
                        await _connection.CloseAsync();
                        return Ok(itemList);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Can't Load GetCustomerById" + ex.Message);
            }
        }

        [Route("/[controller]/getDataBOMMaterialByCode")]
        [HttpPost]
        public async Task<IActionResult> GetDataBOMMaterialByCode([FromBody] SPParameters parUsername)
        {
            try
            {
                await _connection.OpenAsync();

                using (var command = new SqlCommand("spmGetBOMMaterialByCode", _connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@BussCode", parUsername.ACTIVEBRANCH);
                    command.Parameters.AddWithValue("@paraSP", parUsername.DATA);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        var itemList = new List<BOMMaterial>();
                        var properties = typeof(BOMMaterial).GetProperties();
                        while (await reader.ReadAsync())
                        {
                            BOMMaterial item = new();
                            foreach (var property in properties)
                            {
                                if (!reader.IsDBNull(reader.GetOrdinal(property.Name)))
                                {
                                    var value = reader[property.Name];

                                    if (value == DBNull.Value && Nullable.GetUnderlyingType(property.PropertyType) != null)
                                    {
                                        property.SetValue(item, null);
                                    }
                                    else
                                    {
                                        property.SetValue(item, value);
                                    }
                                }
                            }
                            itemList.Add(item);
                        }
                        await _connection.CloseAsync();
                        return Ok(itemList);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Can't Load GetDataBOMMaterialByCode" + ex.Message);
            }
        }

        [Route("/[controller]/getBOMLevelFG")]
        [HttpGet]
        public async Task<IActionResult> GetBOMLevelFG()
        {
            try
            {
                await _connection.OpenAsync();

                using (var command = new SqlCommand("select Id, BussCode,PlantCode,ItemCode,ItemName,Status,QtyUsage,Satuan,LevelSeqn,ParentId,ParentItem from TRBOMItems where ParentItem is null", _connection))
                {
                    command.CommandType = CommandType.Text;
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        var itemList = new List<BOMItem>();
                        var properties = typeof(BOMItem).GetProperties();
                        while (await reader.ReadAsync())
                        {
                            BOMItem item = new();
                            foreach (var property in properties)
                            {
                                if (!reader.IsDBNull(reader.GetOrdinal(property.Name)))
                                {
                                    var value = reader[property.Name];

                                    if (value == DBNull.Value && Nullable.GetUnderlyingType(property.PropertyType) != null)
                                    {
                                        property.SetValue(item, null);
                                    }
                                    else
                                    {
                                        property.SetValue(item, value);
                                    }
                                }
                            }
                            itemList.Add(item);
                        }
                        await _connection.CloseAsync();
                        return Ok(itemList);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Can't Load GetBOMLevelFG " + ex.Message);
            }
        }

        [Route("/[controller]/getBOMLevelRaw/{parentItem}")]
        [HttpGet]
        public async Task<IActionResult> GetBOMLevelRaw(string parentItem)
        {
            try
            {
                await _connection.OpenAsync();

                using (var command = new SqlCommand("select Id,BussCode,PlantCode,ItemCode,ItemName,Status,QtyUsage,Satuan,LevelSeqn,ParentId,ParentItem from TRBOMItems where ParentItem=@para", _connection))
                {
                    command.CommandType = CommandType.Text;
                    command.Parameters.AddWithValue("@para", parentItem);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        var itemList = new List<BOMItem>();
                        var properties = typeof(BOMItem).GetProperties();
                        while (await reader.ReadAsync())
                        {
                            BOMItem item = new();
                            foreach (var property in properties)
                            {
                                if (!reader.IsDBNull(reader.GetOrdinal(property.Name)))
                                {
                                    var value = reader[property.Name];

                                    if (value == DBNull.Value && Nullable.GetUnderlyingType(property.PropertyType) != null)
                                    {
                                        property.SetValue(item, null);
                                    }
                                    else
                                    {
                                        property.SetValue(item, value);
                                    }
                                }
                            }
                            itemList.Add(item);
                        }
                        await _connection.CloseAsync();
                        return Ok(itemList);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Can't Load GetBOMLevelRaw " + ex.Message);
            }
        }

        //[Route("/[controller]/getBOMLevelCP")]
        //[HttpGet]
        //public async Task<IActionResult> GetBOMLevelCP([FromQuery] string parentItem)
        //{
        //    try
        //    {
        //        await _connection.OpenAsync();

        //        using (var command = new SqlCommand("select * from TRBOMItems where ParentItem=@para", _connection))
        //        {
        //            command.CommandType = CommandType.Text;
        //            command.Parameters.AddWithValue("@para", parentItem);
        //            using (var reader = await command.ExecuteReaderAsync())
        //            {
        //                var itemList = new List<BOMMaterial>();
        //                var properties = typeof(BOMMaterial).GetProperties();
        //                while (await reader.ReadAsync())
        //                {
        //                    BOMMaterial item = new();
        //                    foreach (var property in properties)
        //                    {
        //                        if (!reader.IsDBNull(reader.GetOrdinal(property.Name)))
        //                        {
        //                            var value = reader[property.Name];

        //                            if (value == DBNull.Value && Nullable.GetUnderlyingType(property.PropertyType) != null)
        //                            {
        //                                property.SetValue(item, null);
        //                            }
        //                            else
        //                            {
        //                                property.SetValue(item, value);
        //                            }
        //                        }
        //                    }
        //                    itemList.Add(item);
        //                }
        //                await _connection.CloseAsync();
        //                return Ok(itemList);
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Can't Load GetBOMLevelRaw" + ex.Message);
        //    }
        //}
    }
}
