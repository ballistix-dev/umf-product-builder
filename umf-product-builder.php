<?php
/*
Plugin Name: UMF_PRODUCT_DATA
Plugin URI:
Description: UMF_PRODUCT_DATA
Version: 1.5.41
Author: Ballistix SPE
Author URI: http://www.ballistix.com
License: GPL2
*/
/*
Copyright 2019  Ballistix SPE  (email : design@ballistix.com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/


define('UMF_PRODUCT_DATA_VERSION', '1.6.5');

if(!class_exists('UMF_PRODUCT_DATA'))
{
	class UMF_PRODUCT_DATA
	{
		/**
		 * Construct the plugin object
		 */
		public function __construct()
		{

			require_once(sprintf("%s/inc/widget-build.php", dirname(__FILE__)));
			require_once(sprintf("%s/inc/widget-compare.php", dirname(__FILE__)));

		} // END public function __construct

		/**
		 * Activate the plugin
		 */
		public static function activate()
		{
			// Do nothing
		} // END public static function activate

		/**
		 * Deactivate the plugin
		 */
		public static function deactivate()
		{
			// Do nothing
		} // END public static function deactivate

	} // END class UMF_PRODUCT_DATA
} // END if(!class_exists('UMF_PRODUCT_DATA'))

if(class_exists('UMF_PRODUCT_DATA'))
{
	// Installation and uninstallation hooks
	register_activation_hook(__FILE__, array('UMF_PRODUCT_DATA', 'activate'));
	register_deactivation_hook(__FILE__, array('UMF_PRODUCT_DATA', 'deactivate'));

	// instantiate the plugin class
	$plugin_template = new UMF_PRODUCT_DATA();

}
