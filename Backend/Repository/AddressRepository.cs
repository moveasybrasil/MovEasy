using Dapper;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;
using System;

namespace Backend.Repository
{
    public class AddressRepository : Connection, IAddressRepository
    {
        public async Task<string> Add(AddressDTO address)
        {
            try
            {
                int districtId = await GetDistrictIdFromDistricName(address);

                string sql = @"INSERT INTO Address (
                        Street,
                        PostalCode,
                        Number,
                        Address2,
                        District_Id
                    ) VALUE (
                        @Street,
                        @PostalCode,
                        @Number,
                        @Address2,
                        @District_Id
                )";

                await Execute(sql , new {
                    Street = address.Street,
                    PostalCode = address.PostalCode,
                    Number = address.Number,
                    Address2 = address.Address2,
                    District_Id = districtId
                });

                return "Endereço cadastrado.";
            } catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<AddressEntity>> Get()
        {
            string sql = "SELECT * FROM Address";
            return await GetConnection().QueryAsync<AddressEntity>(sql);
        }

        public async Task<AddressEntity> GetById(int id)
        {
            string sql = "SELECT * FROM Address WHERE Id = @id";
            return await GetConnection().QueryFirstAsync<AddressEntity>(sql, new {id});
        }

        public async Task Update(AddressEntity address)
        {
            string sql = @"
                UPDATE Address 
                    SET 
                        Street = @Street,
                        PostalCode = @PostalCode,
                        Number = @Number,
                        Address2 = @Address2,
                        District_Id = @District_Id
                    WHERE
                        Id = @Id
            ";

            await Execute(sql, address);
        }

        private async Task<int> GetDistrictIdFromDistricName(AddressDTO address)
        {
            try
            {
                string sql = "SELECT Id FROM District WHERE Name = @DistrictName AND City_Id = @cityId";

                int  cityId     = await GetCityIdFromCityName(address);
                int? districtId = await GetConnection().QueryFirstOrDefaultAsync<int?>(sql, new { DistrictName = address.District, cityId = cityId });

                if (districtId != null) { return districtId.GetValueOrDefault(); } else { throw new Exception(""); }
            } catch (Exception ex)
            {
                int cityId = await GetCityIdFromCityName(address);

                string sql = @"INSERT INTO District (
                        Name,
                        City_Id
                 ) VALUE (
                        @DistrictName,
                        @Id
                )";

                await Execute(sql, new { DistrictName = address.District, Id = cityId });

                return await GetDistrictIdFromDistricName(address);
            }
        }

        private async Task<int> GetCityIdFromCityName(AddressDTO address)
        {
            try
            {
                string sql = "SELECT Id FROM City WHERE Name = @CityName";

                int? cityId = await GetConnection().QueryFirstOrDefaultAsync<int?>(sql, new { CityName = address.City });

                if (cityId != null) { return cityId.GetValueOrDefault(); } else { throw new Exception(""); }

            } catch (Exception ex)
            {
                int stateId = await GetStateIdFromFuName(address);

                string sql = @"INSERT INTO City (
                        Name,
                        State_Id
                 ) VALUE (
                        @CityName,
                        @Id
                )";

                await Execute(sql, new { CityName = address.City, Id = stateId});

                return await GetCityIdFromCityName(address);
            }
        }

        private async Task<int> GetStateIdFromFuName(AddressDTO address)
        {
            try
            {
                string sql = "SELECT Id FROM State WHERE FU = @FU";
                int? id = await GetConnection().QueryFirstOrDefaultAsync<int?>(sql, new { FU = address.FU });
                if (id == null) { throw new Exception("Estado não encontrado."); }
                return id.GetValueOrDefault();

            } catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
