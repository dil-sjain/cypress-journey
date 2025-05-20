import { faker } from "@faker-js/faker";

export const generateFakeData=()=>{
    return{
        fullname:faker.name.fullName(),
        address:faker.address.streetAddress(),
        area:faker.location.secondaryAddress(),
        city:faker.location.city(),
        state:faker.location.state(),
        country:faker.location.country(),
        pincode:faker.location.zipCode('######'),
        mobile:faker.internet.mobile('##########')
    }
}