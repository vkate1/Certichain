pragma solidity ^0.6.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/utils/Pausable.sol";

contract Certificates is Ownable,Pausable{
    uint256 private Transactid;
    uint public schoolcount = 0;
    uint studentcount = 0;
    
    struct School{
        uint school_id;
        string school_name;
        bool registered;
        uint[] own_students;
    }
    struct Student{
        uint256 aadhar;
        string fname;
        string lname;
        string thash;
        uint256 time;
        
    }
    
    mapping(uint => School)public scl;
    mapping(uint256 => Student)public student;
    event add(uint256 indexed Transact_id);
    
    modifier onlyRegistered(uint sch_id){
        require(scl[sch_id].registered == true,"Check the schoolId");
        _;
    } 
    
    function addSchool(string memory scl_name)public{
        schoolcount++;
        scl[schoolcount].school_id = schoolcount;
        scl[schoolcount].school_name = school_name;
        scl[schoolcount].registered = false;
        
    }

    function registerschool(uint sch_id,bool reg)public onlyOwner{
       scl[sch_id].registered = reg;
    }
    function addStudent(string memory f_name,string memory l_name,uint256 no)public{
        Transactid++;
        student[Transactid] = Student(no,f_name,l_name,'hash',0);
        
    }
    
    function addHash(uint256 Transact_id,string memory hash)public{
        require(Transact_id > 0 && Transact_id <= Transactid);
        student[Transact_id].thash = hash;
        student[Transact_id].time = now;
        
        emit add(Transact_id);
    }
    
    function get(uint256 Transact_id)public view returns(string memory){
        return student[Transact_id].thash;
    }
    
}

