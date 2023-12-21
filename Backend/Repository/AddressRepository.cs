using Dapper;
using Backend.Contracts.Repository;
using Backend.DTO;
using Backend.Entity;
using Backend.Infrastructure;

namespace Backend.Repository
{
    public class AddressRepository : Connection, IAddressRepository
    {
        public async Task Add(AddressDTO address)
        {
            string sql = @"
                INSERT INTO ADDRESS (
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
                    )
            ";

            await Execute(sql , address);
        }

        public async Task<IEnumerable<AddressEntity>> Get()
        {
            string sql = "SELECT * FROM ADDRESS";
            return await GetConnection().QueryAsync<AddressEntity>(sql);
        }

        public async Task<AddressEntity> GetById(int id)
        {
            string sql = "SELECT * FROM ADDRESS WHERE Id = @id";
            return await GetConnection().QueryFirstAsync<AddressEntity>(sql, new {id});
        }

        public async Task Update(AddressEntity address)
        {
            string sql = @"
                UPDATE ADDRESS 
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
    }
}
