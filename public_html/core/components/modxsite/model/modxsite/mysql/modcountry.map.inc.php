<?php
$xpdo_meta_map['modCountry']= array (
  'package' => 'modxsite',
  'version' => '1.1',
  'table' => 'modxsite_countries',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'country' => NULL,
    'rank' => 0,
  ),
  'fieldMeta' => 
  array (
    'country' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => false,
      'index' => 'unique',
    ),
    'rank' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
    ),
  ),
  'indexes' => 
  array (
    'country' => 
    array (
      'alias' => 'country',
      'primary' => false,
      'unique' => true,
      'type' => 'BTREE',
      'columns' => 
      array (
        'country' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
  "compocites"  => array(
        "Cities"  => array(
            "class" => "modCity",
            "cardinality"   => "many",
            "local" => "id",
            "foreign"   => "country_id",
            "owner"     => "local",
        ), 
    ),
);
