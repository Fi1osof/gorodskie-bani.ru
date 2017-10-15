<?php

$xpdo_meta_map = array (
); 

// $this->loadClass("modUser");

$this->map['modResource']['composites']['Company'] = array(
    'class' => 'modCompany',
    'local' => 'id',
    'foreign' => 'resource_id',
    'cardinality' => 'one',
    'owner' => 'foreign',
);

$this->map['modUser']['fields']['delegate'] = NULL;
$this->map['modUser']['fields']['offer'] = NULL;
$this->map['modUser']['fields']['offer_date'] = NULL;
$this->map['modUser']['fields']['contract_date'] = NULL;
$this->map['modUser']['fields']['createdby'] = NULL;


$this->map['modUser']['fieldMeta']['delegate'] = array(
	"default"	=> null,
	"dbtype"	=> "enum",
	"precision"	=> "'0','1'",
	"phptype"	=> "string",
	"null"		=> true,
	"index"		=> "index",
);

$this->map['modUser']['fieldMeta']['offer'] = array(
	"default"	=> null,
	"dbtype"	=> "text",
	"phptype"	=> "string",
	"null"		=> true,
	"index"		=> "index",
);


$this->map['modUser']['fieldMeta']['offer_date'] = array(
	"default"	=> null,
	"dbtype"	=> "int",
	"precision"	=> "unsigned",
	"phptype"	=> "integer",
	"null"		=> true,
	"index"		=> "index",
);


$this->map['modUser']['fieldMeta']['contract_date'] = array(
	"default"	=> null,
	"dbtype"	=> "int",
	"precision"	=> "unsigned",
	"phptype"	=> "integer",
	"null"		=> true,
	"index"		=> "index",
);


$this->map['modUser']['fieldMeta']['createdby'] = array(
	"default"	=> null,
	"dbtype"	=> "int",
	"precision"	=> "unsigned",
	"phptype"	=> "integer",
	"null"		=> true,
	"index"		=> "index",
);
