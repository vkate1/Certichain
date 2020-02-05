

pragma solidity ^0.5.0;

contract Certificates{
    uint256 private Transactid;
    
    struct Student{
        uint256 aadhar;
        string fname;
        string lname;
        string thash;
        
    }
    
    mapping(uint256 => Student)public student;
    event add(uint256 indexed Transact_id);
    
    function addStudent(string memory f_name,string memory l_name,uint256 no)public{
        Transactid++;
        student[Transactid] = Student(no,f_name,l_name,'hash');
        
    }
    
    function addHash(uint256 Transact_id,string memory hash)public{
        require(Transact_id > 0 && Transact_id <= Transactid);
        student[Transact_id].thash = hash;
        emit add(Transact_id);
    }
    
    function get(uint256 Transact_id)public view returns(string memory){
        return student[Transact_id].thash;
    }
    
}
